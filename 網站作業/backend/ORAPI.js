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
 * 向 OpenRouter 傳送聊天訊息（含重試機制和超時控制）
 * @param {{messages: Array, model?: string, timeout?: number}} opts
 * @returns {Promise<Object>} API 回應
 */
async function sendMessage(opts = {}) {
  const client = initializeClient()
  const model = opts.model || process.env.OPENROUTER_MODEL || 'google/gemma-3-27b-it:free'
  const systemPrompt = process.env.OPENROUTER_SYSTEM_PROMPT || 'You are a helpful assistant.'
  const timeout = opts.timeout || 30000 // 預設 30 秒超時
  const messages = Array.isArray(opts.messages) ? opts.messages : [{ role: 'user', content: String(opts.messages || '') }]
  
  // 在訊息開頭加入系統提示
  const payloadMessages = [{ role: 'system', content: systemPrompt }, ...messages]

  return await retry(async (bail) => {
    try {
      console.log(`[ORAPI] 準備發送請求到 ${model}，超時時間: ${timeout}ms`)
      
      // 建立超時 Promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error(`API 呼叫超時 (${timeout}ms)，OpenRouter 伺服器響應緩慢`))
        }, timeout)
      })
      
      // 與超時 Promise 賽跑
      const responsePromise = client.chat.completions.create({
        model: model,
        messages: payloadMessages,
        temperature: 0.7,
        max_tokens: 500
      })
      
      const response = await Promise.race([responsePromise, timeoutPromise])

      console.log(`[ORAPI] 成功收到回應，處理中...`)
      console.log(`[ORAPI] 回應類型:`, response?.choices ? 'standard' : 'unknown')
      return response
    } catch (err) {
      console.error(`[ORAPI] 錯誤: ${err.message}`)
      
      // 超時錯誤 - 重試
      if (err.message.includes('超時')) {
        console.warn(`[ORAPI] 超時錯誤，將進行重試...`)
        throw err
      }
      
      // 4xx 客戶端錯誤（除了 429 和 502）不重試
      if (err.status && err.status >= 400 && err.status < 500 && err.status !== 429 && err.status !== 502) {
        console.error(`[ORAPI] 客戶端錯誤 (${err.status})，不重試`)
        bail(err)
        return
      }
      
      // 401 未授權 - API Key 問題
      if (err.status === 401) {
        const authErr = new Error('API 金鑰認證失敗：請檢查 OPENROUTER_API_KEY 是否正確')
        console.error(`[ORAPI] ${authErr.message}`)
        bail(authErr)
        return
      }
      
      // 429 Too Many Requests - 重試
      if (err.status === 429) {
        console.warn(`[ORAPI] API 限流 (429)，將進行重試...`)
        throw err
      }
      
      // 網路連線失敗
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        console.error(`[ORAPI] 網路連線失敗`)
        throw err
      }
      
      // 其他 5xx 伺服器錯誤進行重試
      if (err.status && err.status >= 500) {
        console.warn(`[ORAPI] 伺服器錯誤 (${err.status})，將進行重試...`)
        throw err
      }
      
      // 預設重試
      throw err
    }
  }, {
    retries: 3,
    factor: 2,
    minTimeout: 1000,
    maxTimeout: 5000,
    onRetry: (err, attempt) => {
      console.warn(`[ORAPI] 第 ${attempt} 次重試：${err.message}`)
    }
  })
}

module.exports = { sendMessage }

