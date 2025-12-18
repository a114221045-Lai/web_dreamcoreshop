# 🔺 夢核物品販賣部 - Dreamcore Shop

一個結合 Dreamcore 美學風格的官方網站加上 AI 客服系統。

## 📋 專案資訊

- **公司名稱**：異次元物流股份有限公司
- **網站名稱**：夢核物品販賣部
- **版本**：0.1.0
- **設計風格**：Dreamcore（懷舊、超現實、夢幻）
- **技術棧**：Node.js + Express + HTML/CSS/JS + OpenRouter API

## 🎨 色彩設定

| 用途 | 名稱 | HEX | RGB |
|------|------|-----|-----|
| 主色 (70-80%) | 暗藍 | #1F2A44 | 31, 42, 68 |
| 次色 (15-25%) | 灰紫 | #7B7289 | 123, 114, 137 |
| 輔助色 (1-5%) | 淡黃 | #F2E2A2 | 242, 226, 162 |

## 📁 專案結構

```
網站作業/
├── backend/
│   ├── server.js          # Express 主伺服器
│   └── ORAPI.js           # OpenRouter API 模組
├── api/                   # API 路由（擴展用）
├── index.html             # 前端首頁
├── styles.css             # 全局樣式
├── script.js              # 前端邏輯
├── .env                   # 環境變數（本地）
├── .env.example           # 環境變數範本
├── package.json           # 依賴配置
├── vercel.json            # Vercel 部署配置
├── SPEC.md                # 專案規格文件
├── OR.md                  # OpenRouter API 指南
├── GOODs.md               # 商品列表
└── README.md              # 本檔案
```

## 🚀 快速開始

### 安裝依賴

```bash
npm install
```

### 本地開發

開發模式（自動重啟）：
```bash
npm run dev
```

生產模式：
```bash
npm start
```

伺服器將在 `http://localhost:3000` 啟動

### 環境變數

複製 `.env.example` 為 `.env`，填入：
- `OPENROUTER_API_KEY`：OpenRouter API Key
- `OPENROUTER_MODEL`：使用的模型（預設：google/gemma-3-27b-it:free）
- `OPENROUTER_SYSTEM_PROMPT`：AI 客服系統提示

## 🔌 API 端點

| 方法 | 端點 | 說明 |
|------|------|------|
| GET | `/api/health` | 健康檢查 |
| POST | `/api/chat` | AI 聊天（body: {messages, model?}） |

### 範例請求

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "你好，這件商品怎麼賣？"}
    ]
  }'
```

## 📦 依賴說明

- **express**：Web 框架
- **cors**：跨域資源共享
- **dotenv**：環境變數管理
- **async-retry**：重試機制（用於 API 呼叫）

## 🌐 部署

### Vercel 部署

1. 推送代碼至 GitHub
2. 在 Vercel 中建立新專案，關聯 GitHub 倉庫
3. 設定環境變數：`OPENROUTER_API_KEY`
4. 部署完成

## 📝 功能清單

- [x] 基本框架建立
- [x] Express 伺服器設置
- [x] OpenRouter API 整合
- [ ] 商品展示頁面
- [ ] 購物車功能
- [ ] 聯絡表單
- [ ] AI 客服聊天
- [ ] 響應式設計
- [ ] Vercel 部署

## 🐛 除錯

查看終端機日誌了解：
- 伺服器啟動狀態
- API 呼叫詳細資訊
- 錯誤信息與堆棧追蹤

## 📞 支援

如有問題，請參考：
- [SPEC.md](./SPEC.md) - 詳細規格
- [OR.md](./OR.md) - API 整合指南
- [OpenRouter 文件](https://openrouter.ai/docs)

---

**開發日期**：2025年12月18日
