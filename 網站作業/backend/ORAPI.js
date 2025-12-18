/**
 * backend/ORAPI.js - OpenRouter API 包裝層
 * 使用 @openrouter/sdk + 指數退避重試機制
 */
const retry = require('async-retry')
const OpenRouter = require('@openrouter/sdk').default || require('@openrouter/sdk')

/**
 * 初始化 OpenRouter 客戶端
 * @returns {OpenRouter} OpenRouter 客戶端實例
 */
function initializeClient() {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.API_KEY
  if (!apiKey) throw new Error('OPENROUTER_API_KEY 未設定於環境變數中')
  
  // 直接使用 OpenRouter 作為建構函式
  const client = new OpenRouter({
    apiKey: apiKey
  })
  
  return client
}

/**
 * 向 OpenRouter 傳送聊天訊息（含重試機制）
 * @param {{messages: Array, model?: string}} opts
 * @returns {Promise<Object>} API 回應
 */
async function sendMessage(opts = {}) {
  const client = initializeClient()
  const model = opts.model || process.env.OPENROUTER_MODEL || 'google/gemma-3-27b-it:free'
  const systemPrompt = process.env.OPENROUTER_SYSTEM_PROMPT || 'You are a helpful assistant.'
  const messages = Array.isArray(opts.messages) ? opts.messages : [{ role: 'user', content: String(opts.messages || '') }]
  
  // 在訊息開頭加入系統提示
  const payloadMessages = [{ role: 'system', content: systemPrompt }, ...messages]

  return await retry(async (bail) => {
    try {
      console.log(`[ORAPI] 準備發送請求到 ${model}`)
      
      const response = await client.chat.completions.create({
        model: model,
        messages: payloadMessages,
        temperature: 0.7,
        max_tokens: 500
      })

      console.log(`[ORAPI] 收到回應，處理中...`)
      return response
    } catch (err) {
      console.error(`[ORAPI] 錯誤: ${err.message}`, err)
      
      // 4xx 客戶端錯誤不重試
      if (err.status && err.status >= 400 && err.status < 500) {
        bail(err)
        return
      }
      
      // 401 未授權 - API Key 問題
      if (err.status === 401) {
        const authErr = new Error('API 金鑰認證失敗：請檢查 OPENROUTER_API_KEY 是否正確')
        bail(authErr)
        return
      }
      
      // 其他錯誤進行重試
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        const networkErr = new Error(`網路連線失敗：無法連接到 OpenRouter API`)
        networkErr.originalError = err
        throw networkErr
      }
      
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

