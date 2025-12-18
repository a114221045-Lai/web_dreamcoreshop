# 📚 文件索引和快速參考

## 🗂️ 項目文件結構

```
web_dreamcoreshop/
├── 網站作業/                          # 主要項目文件夾
│   ├── backend/
│   │   ├── server.js                 # ✅ Express 後端服務 (已優化)
│   │   └── ORAPI.js                  # ✅ OpenRouter API 包裝層 (已修復)
│   │
│   ├── 前端文件
│   ├── index.html                    # 主頁
│   ├── script.js                     # ✅ 前端邏輯 (已改進)
│   ├── styles.css                    # 樣式表
│   │
│   ├── 測試和診斷工具
│   ├── online-test.html              # ✨ 新增 - 線上測試頁 (推薦使用)
│   ├── debug-test.html               # ✅ 診斷工具
│   ├── api-test.html                 # API 測試工具
│   │
│   ├── 配置文件
│   ├── package.json                  # ✅ npm 配置 (已優化)
│   ├── vercel.json                   # ✅ Vercel 部署配置 (已優化)
│   ├── .env.example                  # 環境變數示例
│   ├── .env                          # 本地環境變數 (需要填入)
│   ├── .gitignore                    # Git 忽略配置
│   │
│   ├── 文檔文件
│   ├── COMPLETION_SUMMARY.md         # ✨ 新增 - 完成總結
│   ├── README_DEPLOYMENT.md          # ✨ 新增 - 快速參考指南
│   ├── DEPLOYMENT_GUIDE.md           # ✨ 新增 - 完整部署指南
│   ├── DIAGNOSTIC_GUIDE.md           # ✅ 診斷問題指南
│   │
│   ├── 部署檢查工具
│   ├── deploy-check.bat              # ✨ 新增 - Windows 檢查
│   ├── deploy-check.sh               # ✨ 新增 - Linux/Mac 檢查
│   │
│   └── 其他文件
│       ├── README.md
│       ├── SPEC.md
│       ├── GOODs.md
│       └── ...
│
└── ORAPI.js                          # 根目錄備份 (已同步)
```

---

## 📖 文檔導航

### 🚀 部署相關
| 文件名 | 用途 | 推薦閱讀順序 |
|-------|------|-----------|
| [COMPLETION_SUMMARY.md](COMPLETION_SUMMARY.md) | 完成總結 | 1️⃣ 首先閱讀 |
| [README_DEPLOYMENT.md](README_DEPLOYMENT.md) | 快速開始 | 2️⃣ 快速部署 |
| [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) | 完整指南 | 3️⃣ 詳細參考 |
| [DIAGNOSTIC_GUIDE.md](DIAGNOSTIC_GUIDE.md) | 問題診斷 | 遇到問題時 |

### 🧪 測試工具
| 工具 | 訪問方式 | 用途 |
|-----|--------|------|
| online-test.html | http://localhost:3000/online-test.html | 線上完整測試 (推薦) |
| debug-test.html | http://localhost:3000/debug-test.html | 診斷和調試 |
| api-test.html | http://localhost:3000/api-test.html | API 端點測試 |

### 🛠️ 檢查工具
| 工具 | 用途 | 操作系統 |
|-----|------|--------|
| deploy-check.bat | 部署前檢查 | 🪟 Windows |
| deploy-check.sh | 部署前檢查 | 🐧 Linux / 🍎 Mac |

---

## 🔑 關鍵文件詳解

### 📋 backend/server.js
**功能：** Express 後端服務器主文件
- ✅ 提供靜態文件
- ✅ API 路由處理
- ✅ 錯誤管理
- ✅ CORS 配置

**主要路由：**
```
GET  /api/health     → 健康檢查
POST /api/chat       → AI 聊天接口
POST /api/contact    → 聯絡表單
```

**修復內容：**
- ✅ 改進 `/api/chat` 錯誤處理
- ✅ 添加 Content-Type 頭
- ✅ 改善路由配置

### 📋 backend/ORAPI.js
**功能：** OpenRouter API 包裝層
- ✅ SDK 初始化
- ✅ 消息發送
- ✅ 重試機制
- ✅ 錯誤處理

**修復內容：**
- ✅ 修復 SDK 導入方式
- ✅ 改用 `chat.completions.create()`
- ✅ 改進錯誤分類

### 📋 script.js
**功能：** 前端主邏輯
- ✅ 聊天界面
- ✅ API 調用
- ✅ 購物車功能
- ✅ 表單提交

**修復內容：**
- ✅ JSON 解析錯誤處理
- ✅ 使用 `response.text()` 先讀取
- ✅ 支持多種回應格式
- ✅ 詳細 debug 日誌

### 📋 vercel.json
**功能：** Vercel 部署配置
```json
{
  "builds": [{"src": "backend/server.js", "use": "@vercel/node"}],
  "routes": [...]
}
```

**修復內容：**
- ✅ 移除無效 buildCommand
- ✅ 簡化配置

### 📋 package.json
**功能：** npm 依賴管理
```json
{
  "dependencies": {
    "@openrouter/sdk": "^0.1.27",
    "async-retry": "^1.3.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2"
  }
}
```

**修復內容：**
- ✅ 重新排序 scripts
- ✅ 添加 nodemon

---

## 🌐 API 端點參考

### 健康檢查
```bash
GET /api/health

回應：
{
  "status": "ok",
  "time": "2025-12-18T10:30:00.000Z",
  "service": "dreamcore-shop-api"
}
```

### 聊天接口
```bash
POST /api/chat

請求：
{
  "messages": [{"role": "user", "content": "你好"}],
  "model": "google/gemma-3-27b-it:free"
}

成功回應 (200)：
{
  "ok": true,
  "response": {...}
}

錯誤回應 (400/500)：
{
  "ok": false,
  "error": "錯誤信息"
}
```

### 聯絡表單
```bash
POST /api/contact

請求：
{
  "name": "用戶名",
  "email": "user@example.com",
  "message": "訊息內容"
}

回應：
{
  "ok": true,
  "message": "感謝您的訊息，我們會盡快回覆"
}
```

---

## 🔐 環境變數配置

### 本地開發 (.env)
```dotenv
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=google/gemma-3-27b-it:free
OPENROUTER_SYSTEM_PROMPT=你是一個夢核物品販賣部的AI客服助理...
```

### Vercel 部署
通過 Dashboard 設置同樣的環境變數
- 訪問 https://vercel.com/dashboard
- 選擇項目 → Settings → Environment Variables
- 添加三個環境變數

---

## 🚀 快速命令參考

### 開發環境
```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm start                    # 生產模式
npm run dev                  # 開發模式 (nodemon)

# 訪問應用
http://localhost:3000              # 主應用
http://localhost:3000/online-test.html   # 線上測試 (推薦)
http://localhost:3000/debug-test.html    # 診斷工具
```

### 部署
```bash
# 運行檢查
deploy-check.bat             # Windows
bash deploy-check.sh         # Mac/Linux

# Vercel 部署
vercel deploy --prod

# 查看部署日誌
vercel logs <project-name> --tail
```

---

## ✨ 新增功能清單

### 📄 新增文檔
- ✨ `COMPLETION_SUMMARY.md` - 完成總結 (280+ 行)
- ✨ `README_DEPLOYMENT.md` - 快速參考 (150+ 行)
- ✨ `DEPLOYMENT_GUIDE.md` - 完整指南 (500+ 行)
- ✨ 本文件 - 文件索引和快速參考

### 🧪 新增工具
- ✨ `online-test.html` - 線上完整測試頁 (380+ 行)
- ✨ `deploy-check.bat` - Windows 檢查工具
- ✨ `deploy-check.sh` - Linux/Mac 檢查工具

### 🔧 改進代碼
- ✅ `backend/server.js` - 錯誤處理改進
- ✅ `backend/ORAPI.js` - SDK 修復和日誌改進
- ✅ `script.js` - JSON 解析改進
- ✅ `vercel.json` - 配置優化
- ✅ `package.json` - 依賴優化

---

## 🎯 常用工作流程

### 工作流程 1: 本地開發和測試
```
1. npm install
2. cp .env.example .env (編輯 .env)
3. npm start
4. 訪問 http://localhost:3000/online-test.html
5. 進行測試
```

### 工作流程 2: 部署到 Vercel
```
1. bash deploy-check.sh (或 deploy-check.bat)
2. vercel login
3. vercel deploy --prod
4. 在 Vercel 中設置環境變數
5. 訪問 https://your-project.vercel.app/online-test.html
```

### 工作流程 3: 問題診斷
```
1. 訪問 /debug-test.html
2. 點擊「執行完整診斷」
3. 查看日誌信息
4. 參考 DIAGNOSTIC_GUIDE.md
5. 根據指導進行修復
```

---

## 📞 故障排除快速索引

| 問題 | 解決方案 | 相關文檔 |
|-----|--------|--------|
| 無法連接到後端 | 查看 DEPLOYMENT_GUIDE.md 第 9.1 節 | [點擊](DEPLOYMENT_GUIDE.md#問題-1-無法連接到後端) |
| API 金鑰認證失敗 | 查看 DEPLOYMENT_GUIDE.md 第 9.2 節 | [點擊](DEPLOYMENT_GUIDE.md#問題-2-api-金鑰認證失敗) |
| JSON 解析錯誤 | 查看 DIAGNOSTIC_GUIDE.md | [點擊](DIAGNOSTIC_GUIDE.md) |
| 502 Bad Gateway | 查看 DEPLOYMENT_GUIDE.md 第 9.4 節 | [點擊](DEPLOYMENT_GUIDE.md#問題-4-502-bad-gateway) |
| 聊天返回空回應 | 查看 DEPLOYMENT_GUIDE.md 第 9.5 節 | [點擊](DEPLOYMENT_GUIDE.md#問題-5-聊天功能返回空回應) |

---

## 💡 最佳實踐

### ✅ 部署前
- [ ] 運行 `deploy-check.bat` (Windows) 或 `deploy-check.sh` (Mac/Linux)
- [ ] 確認所有依賴已安裝
- [ ] 測試本地環境
- [ ] 驗證 API Key 有效性

### ✅ 部署中
- [ ] 設置 Vercel 環境變數
- [ ] 使用 `--prod` 標誌進行生產部署
- [ ] 監控部署過程日誌

### ✅ 部署後
- [ ] 訪問線上測試頁面驗證
- [ ] 檢查 Vercel 日誌
- [ ] 監控 API 使用情況
- [ ] 定期備份 API Key

---

## 🎓 學習資源

### 官方文檔
- [Express.js 文檔](https://expressjs.com)
- [OpenRouter API 文檔](https://openrouter.ai/docs)
- [Vercel 部署文檔](https://vercel.com/docs)
- [Node.js 文檔](https://nodejs.org/docs)

### 本項目文檔
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - 完整部署指南
- [DIAGNOSTIC_GUIDE.md](DIAGNOSTIC_GUIDE.md) - 問題診斷
- [README_DEPLOYMENT.md](README_DEPLOYMENT.md) - 快速開始

---

## 📊 項目統計

### 文件數量
- 前端文件：3 個 (HTML + CSS + JS)
- 後端文件：2 個 (server.js + ORAPI.js)
- 配置文件：3 個 (package.json + vercel.json + .env)
- 測試工具：3 個 (online-test.html + debug-test.html + api-test.html)
- 文檔文件：6 個 (部署/診斷/快速參考等)
- 檢查工具：2 個 (deploy-check.bat + deploy-check.sh)

### 代碼行數
- backend/server.js：~100 行
- backend/ORAPI.js：~75 行
- script.js：~350+ 行
- online-test.html：~380 行
- debug-test.html：~360 行

### 文檔行數
- DEPLOYMENT_GUIDE.md：~500+ 行
- README_DEPLOYMENT.md：~150+ 行
- COMPLETION_SUMMARY.md：~280+ 行
- DIAGNOSTIC_GUIDE.md：~150+ 行

---

## 🎉 準備就緒！

所有文件已準備完畢。選擇一個入口開始：

1. **第一次看？** → 閱讀 [COMPLETION_SUMMARY.md](COMPLETION_SUMMARY.md)
2. **想快速部署？** → 閱讀 [README_DEPLOYMENT.md](README_DEPLOYMENT.md)
3. **需要詳細步驟？** → 閱讀 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
4. **遇到問題？** → 使用 `/online-test.html` 診斷

---

**最後更新：2025年12月18日**
**狀態：✅ 所有文件已準備就緒**
