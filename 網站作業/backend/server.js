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
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model } = req.body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ ok: false, error: 'messages 必須為陣列' })
    }

    if (messages.length === 0) {
      return res.status(400).json({ ok: false, error: 'messages 不能為空' })
    }

    console.log(`[${new Date().toISOString()}] Chat request:`, { messageCount: messages.length, model })

    const response = await sendMessage({ messages, model })
    
    console.log(`[${new Date().toISOString()}] Chat response received`)
    res.json({ ok: true, response })
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Chat error:`, err && err.message ? err.message : err)
    res.status(500).json({ ok: false, error: err && err.message ? err.message : 'server error' })
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
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: '名字、信箱和訊息為必填項目' })
    }

    // 簡單的電子郵件驗證
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ ok: false, error: '請提供有效的電子郵件地址' })
    }

    console.log(`[${new Date().toISOString()}] Contact form submitted:`, { name, email, messageLength: message.length })

    // 這裡可以添加發送郵件或保存到數據庫的邏輯
    // 目前只返回成功狀態
    res.json({ ok: true, message: '感謝您的訊息，我們會盡快回覆' })
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Contact error:`, err && err.message ? err.message : err)
    res.status(500).json({ ok: false, error: '提交聯絡表單時出錯' })
  }
})

/**
 * 捕捉 404 - 返回前端首頁（SPA 支持）
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] 🚀 Backend API listening on http://localhost:${PORT}`)
  console.log(`   Health check: http://localhost:${PORT}/api/health`)
  console.log(`   Chat endpoint: POST http://localhost:${PORT}/api/chat`)
  console.log(`   Contact endpoint: POST http://localhost:${PORT}/api/contact`)
})
