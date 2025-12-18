/**
 * backend/ORAPI.js - OpenRouter API 包裝層
 * 使用 @openrouter/sdk + 指數退避重試機制
 */
const retry = require('async-retry')
const { OpenRouter } = require('@openrouter/sdk')

/**
 * 初始化 OpenRouter 客戶端
 * @returns {OpenRouter} OpenRouter 客戶端實例
 */
function initializeClient() {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.API_KEY
  if (!apiKey) throw new Error('OPENROUTER_API_KEY 未設定於環境變數中')
  
  return new OpenRouter({
    apiKey: apiKey,
    baseURL: 'https://openrouter.ai/api/v1'
  })
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
      const response = await client.chat.send({
        model: model,
        messages: payloadMessages,
        temperature: 0.7,
        max_tokens: 500
      })

      return response
    } catch (err) {
      // 4xx 客戶端錯誤不重試
      if (err.status && err.status >= 400 && err.status < 500) {
        bail(err)
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
    retries: 4,
    factor: 2,
    minTimeout: 500,
    maxTimeout: 4000,
    onRetry: (err, attempt) => {
      console.warn(`[ORAPI] 重試第 ${attempt} 次：${err.message}`)
    }
  })
}

module.exports = { sendMessage }

