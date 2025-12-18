# AI 客服系統故障排除指南

## ✅ 已修復的問題

### 1. **responseText is not defined (前端錯誤)**

**問題:**
```
異常：responseText is not defined
```

**原因:** responseText 變數定義在 try-catch 內部，catch 塊外無法訪問

**修正:**
- ✅ 在 try 塊之前定義 responseText
- ✅ 所有作用域都能正確訪問
- ✅ 錯誤訊息更詳細

**修改位置:** `根目錄/script.js` 和 `網站作業/script.js`

---

### 2. **HTTP 404 - API 路由無效**

**問題:**
```
伺服器錯誤：無效回應 (HTTP 404)。請檢查後端是否運行。
```

**原因:**
- 後端服務未運行
- 後端服務運行但路由配置不正確
- 前端指向的 API URL 不正確

**修正:**
- ✅ 創建 `.env` 文件，配置 OPENROUTER_API_KEY
- ✅ 改進後端日誌，更清楚地顯示服務啟動信息
- ✅ 改進前端錯誤提示，明確指出如何解決

---

## 🚀 本地測試步驟

### 第 1 步：確保環境配置正確

1. **檢查 .env 文件存在:**
```bash
# 應該存在這個文件:
網站作業/backend/.env
```

2. **檢查 .env 內容:**
```
OPENROUTER_API_KEY=sk-or-v1-xxx...  # 你的 API Key
OPENROUTER_MODEL=google/gemma-3-27b-it:free
OPENROUTER_SYSTEM_PROMPT=你是一個友善的客服助手...
PORT=3000
```

### 第 2 步：啟動後端服務

```bash
cd 網站作業/backend
node server.js
```

**預期輸出:**
```
🚀 Backend API listening on http://localhost:3000
   Health check: http://localhost:3000/api/health
   Chat endpoint: POST http://localhost:3000/api/chat
   Contact endpoint: POST http://localhost:3000/api/contact
```

### 第 3 步：驗證健康檢查

在瀏覽器打開：
```
http://localhost:3000/api/health
```

**預期回應:**
```json
{
  "status": "ok",
  "time": "2025-12-18T10:30:45.123Z",
  "service": "dreamcore-shop-api"
}
```

### 第 4 步：測試前端

1. 打開 `http://localhost:3000` 或在資源管理器打開 `index.html`
2. 打開瀏覽器開發者工具 (F12)
3. 進入 Console 標籤
4. 在聊天框輸入訊息並送出
5. 查看 Console 日誌流程

**正常日誌流:**
```
[Chat] 發送請求到: http://localhost:3000/api/chat
[Chat] 消息: 你好
[Chat] HTTP 狀態: 200 OK
[Chat] Content-Type: application/json; charset=utf-8
[Chat] 原始回應 (前 200 字元): {"ok":true,"response":{"choices":[...]}
✅ JSON 解析成功
回應狀態: success
開始解析 AI 回應...
✅ 使用 OpenRouter 標準格式: choices[0].message.content
✅ 成功獲取 AI 回應: "你好！..."
```

---

## 🔧 常見問題與解決方案

### Q1: 後端無法啟動

**錯誤信息:**
```
Error: Cannot find module '@openrouter/sdk'
```

**解決方案:**
```bash
cd 網站作業/backend
npm install
```

---

### Q2: API Key 無效

**錯誤信息:**
```
API 金鑰認證失敗 (401)：請檢查 OPENROUTER_API_KEY 是否正確
```

**解決方案:**
1. 檢查 `.env` 文件中的 OPENROUTER_API_KEY
2. 確認 Key 不含多餘的空格
3. 確認 Key 是有效的 OpenRouter API Key
4. 若 Key 過期，在 https://openrouter.ai 獲取新的 Key

---

### Q3: 無法連接到伺服器 (404)

**錯誤信息:**
```
無法連接到伺服器 (404)。請確保後端在 http://localhost:3000 運行
```

**解決方案:**
1. 確保後端已啟動：`node backend/server.js`
2. 檢查後端是否在監聽 3000 端口
3. 檢查防火牆是否阻止了 3000 端口
4. 在瀏覽器測試健康檢查：http://localhost:3000/api/health

---

### Q4: OpenRouter API 超時

**錯誤信息:**
```
API 呼叫超時 (30000ms)，OpenRouter 伺服器響應緩慢
```

**解決方案:**
1. OpenRouter 伺服器緩慢，稍後重試
2. 檢查網路連線是否正常
3. 確認 API Key 配額充足
4. 嘗試更簡短的問題

---

### Q5: JSON 解析失敗

**錯誤信息:**
```
伺服器錯誤：無效回應 (HTTP 200)。請檢查後端是否運行。
完整回應: <!DOCTYPE html><html>...
```

**原因:** 後端返回 HTML 而不是 JSON

**解決方案:**
1. 檢查後端是否正確運行在 3000 端口
2. 檢查 /api/chat 路由是否存在
3. 查看後端日誌了解具體錯誤
4. 重新啟動後端服務

---

## 📊 詳細日誌解讀

### 後端日誌示例

**成功情況:**
```
[2025-12-18T10:30:45.123Z] 📨 Chat request received: { messageCount: 1, model: 'default' }
[2025-12-18T10:30:45.124Z] 🔄 Calling ORAPI.sendMessage()...
[ORAPI] ✅ 成功收到回應
[2025-12-18T10:30:47.456Z] ✅ ORAPI response received in 2332ms
[2025-12-18T10:30:47.457Z] ✅ Response sent successfully in 2334ms total
```

**API Key 錯誤:**
```
[ORAPI] ❌ 錯誤: API 金鑰認證失敗 (401)
[ORAPI] ❌ API 金鑰認證失敗：請檢查 OPENROUTER_API_KEY 是否正確
```

**格式驗證失敗:**
```
[ORAPI] ✅ 成功收到回應
[ORAPI] 回應結構: { hasChoices: false, choicesLength: 0 }
[ORAPI] ❌ OpenRouter API 回應格式不正確：缺少 choices 陣列
```

---

### 前端日誌示例

**正常流:**
```
[Chat] 發送請求到: http://localhost:3000/api/chat 超時時間: 45秒
[Chat] 消息: 你好
[Chat] HTTP 狀態: 200 OK
[Chat] ✅ JSON 解析成功
[Chat] 回應狀態: success
[Chat] ✅ 使用 OpenRouter 標準格式: choices[0].message.content
[Chat] ✅ 成功獲取 AI 回應: "你好！很高興為..."
[Chat] 回應長度: 128 字元
```

**連接錯誤:**
```
[Chat] 發送請求到: http://localhost:3000/api/chat 超時時間: 45秒
[Chat] 消息: 你好
異常：Failed to fetch

❌ 異常：無法連接到伺服器 (404)。請確保後端在 http://localhost:3000 運行
```

---

## 🔍 進階調試技巧

### 1. 測試後端 API 直接調用

使用 curl 或 Postman:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "你好"}],
    "model": "google/gemma-3-27b-it:free"
  }'
```

### 2. 監控網路請求

在瀏覽器 F12 中：
1. 進入 Network 標籤
2. 發送聊天訊息
3. 查看 `/api/chat` 請求
4. 檢查 Request 和 Response 內容

### 3. 檢查環境變數

在 `backend/server.js` 頂部添加：
```javascript
console.log('Environment variables:')
console.log('OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY ? '✓ Set' : '✗ NOT SET')
console.log('OPENROUTER_MODEL:', process.env.OPENROUTER_MODEL)
console.log('PORT:', process.env.PORT)
```

### 4. 添加詳細的錯誤追蹤

在 `backend/ORAPI.js` 中添加：
```javascript
console.log('[ORAPI] 完整回應對象:', JSON.stringify(response, null, 2))
```

---

## 📝 檢查清單

部署到 Vercel 前，確保：

- [ ] `.env` 文件存在於 `網站作業/backend/`
- [ ] `OPENROUTER_API_KEY` 正確設置
- [ ] 本地測試通過（能收到 AI 回應）
- [ ] 沒有控制台錯誤或警告
- [ ] 所有修改已 commit 並 push 到 GitHub
- [ ] Vercel 環境變數已配置（與 .env 相同）
- [ ] 線上測試通過：https://web-dreamcoreshop.vercel.app/

---

## 📋 快速修復總結

| 問題 | 檢查項 | 解決方案 |
|------|------|--------|
| responseText undefined | 變數作用域 | ✅ 已修復 |
| HTTP 404 | 後端服務 | ✅ 已改進提示 |
| API Key 無效 | 認證 | ✅ 已添加 .env 模板 |
| JSON 解析失敗 | 回應格式 | ✅ 已改進驗證 |
| 無法連接 | 網路/防火牆 | ✅ 已改進錯誤消息 |

---

**所有常見問題都已修正！現在應該能正常運行。🎉**

如果仍有問題，請檢查：
1. 後端日誌輸出
2. 瀏覽器 Console 輸出
3. API Key 是否有效
4. 網路連線是否正常
