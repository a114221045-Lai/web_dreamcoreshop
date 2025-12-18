/**
 * backend/ORAPI.js - OpenRouter API 包裝層
 * 直接使用 REST API + 指數退避重試機制
 * 支持本地模擬模式用於開發和測試
 */
const retry = require('async-retry')

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1'
const USE_MOCK_MODE = process.env.USE_MOCK_MODE === 'true'

/**
 * 模擬 AI 回應生成器
 */
function generateMockResponse(userMessage) {
  const responses = [
    '夢核是一種超現實的美學風格，充滿懷舊與迷幻的氛圍，透過模糊的影像和詭異的物品交織而成。它就像走進一場永遠不會結束的夢，每個角落都隱藏著不為人知的故事。',
    '這件物品承載著時間的秘密。它看似普通，卻在黑暗中閃爍著一種無法名狀的光芒。每當你凝視它，就彷彿回到了某個遺忘的時刻。',
    '在我們的店裡，每件商品都是一段被凍結的記憶。它們不属於這個時代，卻以某種詭異的方式存在。收集它們，就是在收集你心中最深層的懷舊感。',
    '夢核物品販賣部歡迎你的到來。無論你尋找什麼，這裡都有些什麼在等著你——那些在夢與現實之間遊蕩的物件。',
    '這是一個關於遺忘與記憶的故事。我們販售的不只是物品，而是時間旅行的入場券。'
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

/**
 * 向 OpenRouter 傳送聊天訊息（含重試機制）
 * @param {{messages: Array, model?: string}} opts
 * @returns {Promise<Object>} API 回應
 */
async function sendMessage(opts = {}) {
  // 如果啟用模擬模式，返回模擬回應
  if (USE_MOCK_MODE) {
    console.log(`[ORAPI] 使用模擬模式生成回應`)
    const userMessage = opts.messages?.[opts.messages.length - 1]?.content || 'Hello'
    return {
      id: `mock-${Date.now()}`,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: opts.model || 'google/gemma-3-27b-it:free',
      choices: [
        {
          index: 0,
          message: {
            role: 'assistant',
            content: generateMockResponse(userMessage)
          },
          finish_reason: 'stop'
        }
      ],
      usage: {
        prompt_tokens: 50,
        completion_tokens: 50,
        total_tokens: 100
      }
    }
  }

  // 真實 API 模式
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.API_KEY
  if (!apiKey) throw new Error('OPENROUTER_API_KEY 未設定於環境變數中')
  
  const model = opts.model || process.env.OPENROUTER_MODEL || 'google/gemma-3-27b-it:free'
  const systemPrompt = process.env.OPENROUTER_SYSTEM_PROMPT || 'You are a helpful assistant.'
  const messages = Array.isArray(opts.messages) ? opts.messages : [{ role: 'user', content: String(opts.messages || '') }]
  
  // 在訊息開頭加入系統提示
  const payloadMessages = [{ role: 'system', content: systemPrompt }, ...messages]

  return await retry(async (bail) => {
    try {
      console.log(`[ORAPI] 準備發送請求到 ${model}`)
      
      const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://github.com/user/dreamcore-shop',
          'X-Title': 'Dreamcore Shop'
        },
        body: JSON.stringify({
          model: model,
          messages: payloadMessages,
          temperature: 0.7,
          max_tokens: 500
        })
      })

      console.log(`[ORAPI] 收到回應，狀態: ${response.status}`)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const error = new Error(`OpenRouter API 錯誤: ${response.status} ${response.statusText}`)
        error.status = response.status
        error.data = errorData
        throw error
      }

      const data = await response.json()
      console.log(`[ORAPI] 解析回應成功`)
      return data
    } catch (err) {
      console.error(`[ORAPI] 錯誤: ${err.message}`)
      
      // 4xx 客戶端錯誤不重試（除了 429）
      if (err.status && err.status >= 400 && err.status < 500 && err.status !== 429) {
        bail(err)
        return
      }
      
      // 401 未授權 - API Key 問題
      if (err.status === 401) {
        const authErr = new Error('API 金鑰認證失敗：請檢查 OPENROUTER_API_KEY 是否正確。建議啟用 USE_MOCK_MODE=true 進行本地開發。')
        bail(authErr)
        return
      }
      
      // 其他錯誤進行重試
      throw err
    }
  }, {
    retries: 3,
    factor: 2,
    minTimeout: 1000,
    maxTimeout: 5000,
    onRetry: (err, attempt) => {
      console.warn(`[ORAPI] 重試第 ${attempt} 次：${err.message}`)
    }
  })
}

module.exports = { sendMessage }
