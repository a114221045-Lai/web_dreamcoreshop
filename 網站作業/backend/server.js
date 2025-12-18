/**
 * backend/server.js - Express 伺服器主程式
 * 提供靜態檔案與 API 路由（/api/health, /api/chat）
 */
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const { sendMessage } = require('./ORAPI')

const app = express()
app.use(cors())
app.use(express.json())

// 提供前端靜態檔案
app.use(express.static(path.join(__dirname, '..')))

const PORT = process.env.PORT || 3000

/**
 * 健康檢查路由
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), service: 'dreamcore-shop-api' })
})

/**
 * AI 聊天路由 - POST /api/chat
 * 期望 body: { messages: Array<{role, content}>, model?: string }
 * 返回: { ok: true, response: {choices: Array}, status: 'success' }
 */
app.post('/api/chat', async (req, res) => {
  const startTime = Date.now()
  try {
    const { messages, model } = req.body

    // 驗證請求
    if (!messages || !Array.isArray(messages)) {
      console.warn(`[${new Date().toISOString()}] ❌ Invalid messages:`, typeof messages)
      return res.status(400).json({ 
        ok: false, 
        error: 'messages 必須為陣列',
        status: 'validation_error'
      })
    }

    if (messages.length === 0) {
      console.warn(`[${new Date().toISOString()}] ❌ Empty messages array`)
      return res.status(400).json({ 
        ok: false, 
        error: 'messages 不能為空',
        status: 'validation_error'
      })
    }

    console.log(`[${new Date().toISOString()}] 📨 Chat request received:`, { 
      messageCount: messages.length, 
      model: model || 'default',
      firstMessageLength: messages[0]?.content?.length || 0
    })

    // 呼叫 ORAPI 發送訊息
    console.log(`[${new Date().toISOString()}] 🔄 Calling ORAPI.sendMessage()...`)
    const response = await sendMessage({ messages, model })
    
    const duration = Date.now() - startTime
    console.log(`[${new Date().toISOString()}] ✅ ORAPI response received in ${duration}ms`)
    
    // 驗證回應
    if (!response) {
      console.error(`[${new Date().toISOString()}] ❌ ORAPI returned null/undefined response`)
      return res.status(500).json({ 
        ok: false, 
        error: '無法獲得 AI 回應',
        status: 'null_response'
      })
    }

    if (!response.choices || !Array.isArray(response.choices)) {
      console.error(`[${new Date().toISOString()}] ❌ ORAPI response missing choices:`, 
        JSON.stringify(response).substring(0, 500))
      return res.status(500).json({ 
        ok: false, 
        error: 'OpenRouter API 回應格式不正確',
        status: 'invalid_format',
        receivedType: typeof response
      })
    }

    if (response.choices.length === 0) {
      console.error(`[${new Date().toISOString()}] ❌ ORAPI choices array is empty`)
      return res.status(500).json({ 
        ok: false, 
        error: 'OpenRouter API 未返回選擇',
        status: 'empty_choices'
      })
    }

    const choice = response.choices[0]
    if (!choice.message || !choice.message.content) {
      console.error(`[${new Date().toISOString()}] ❌ ORAPI choice missing message.content`)
      return res.status(500).json({ 
        ok: false, 
        error: 'OpenRouter API 回應缺少訊息內容',
        status: 'missing_content'
      })
    }

    console.log(`[${new Date().toISOString()}] 📨 AI response content:`, 
      choice.message.content.substring(0, 100) + '...')
    
    // 設置回應頭並返回成功
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.status(200).json({ 
      ok: true, 
      response: response,
      status: 'success',
      duration: duration
    })
    
    console.log(`[${new Date().toISOString()}] ✅ Response sent successfully in ${Date.now() - startTime}ms total`)
  } catch (err) {
    const duration = Date.now() - startTime
    const errMsg = err && err.message ? err.message : String(err)
    const errStack = err && err.stack ? err.stack.substring(0, 1000) : 'no stack'
    
    console.error(`[${new Date().toISOString()}] ❌ Chat error after ${duration}ms:`, errMsg)
    console.error(`[${new Date().toISOString()}] Error details:`, errStack)
    
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.status(500).json({ 
      ok: false, 
      error: errMsg,
      status: 'server_error',
      duration: duration
    })
  }
})

/**
 * 聯絡表單提交路由 - POST /api/contact
 * 期望 body: { name, email, message }
 */
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body

    // 驗證必填欄位
    const errors = {}
    if (!name || name.trim() === '') {
      errors.name = '姓名不能為空'
    }
    if (!email || email.trim() === '') {
      errors.email = 'Email 不能為空'
    }
    if (!message || message.trim() === '') {
      errors.message = '訊息不能為空'
    }

    // Email 驗證 (RFC 5322 相容)
    // 支持: 多個點、連字號、加號尋址 (user+tag@sub-domain.example.co.uk)
    const emailRegex = /^[a-zA-Z0-9._+%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (email && !emailRegex.test(email.trim())) {
      errors.email = '請提供有效的電子郵件地址'
    }

    // 如果有驗證錯誤，返回詳細訊息
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ 
        ok: false, 
        error: Object.values(errors)[0],
        errors: errors
      })
    }

    console.log(`[${new Date().toISOString()}] Contact form submitted:`, { 
      name: name.trim(), 
      email: email.trim(), 
      messageLength: message.length 
    })

    // 這裡可以添加發送郵件或保存到數據庫的邏輯
    // 目前只返回成功狀態
    res.json({ 
      ok: true, 
      message: '感謝您的訊息，我們會盡快回覆您'
    })
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Contact error:`, err && err.message ? err.message : err)
    res.status(500).json({ 
      ok: false, 
      error: '提交聯絡表單時出錯，請稍後重試' 
    })
  }
})

/**
 * 捕捉 404 - 返回前端首頁（SPA 支持）
 * 注意：必須放在所有 API 路由之後
 */
app.use((req, res, next) => {
  // 如果不是 API 路由，嘗試返回靜態檔案或首頁
  if (!req.path.startsWith('/api')) {
    // 嘗試發送首頁供 SPA 使用
    return res.sendFile(path.join(__dirname, '..', 'index.html'), (err) => {
      if (err) {
        res.status(404).json({ ok: false, error: 'Not found' })
      }
    })
  }
  // API 路由 404
  res.status(404).json({ ok: false, error: 'API endpoint not found' })
})

app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] 🚀 Backend API listening on http://localhost:${PORT}`)
  console.log(`   Health check: http://localhost:${PORT}/api/health`)
  console.log(`   Chat endpoint: POST http://localhost:${PORT}/api/chat`)
  console.log(`   Contact endpoint: POST http://localhost:${PORT}/api/contact`)
})
