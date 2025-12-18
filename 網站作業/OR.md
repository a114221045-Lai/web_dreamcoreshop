@workspace 目前開發本網站中需要一個AI 客服系統，將使用 Open Router  API，並協助我依下列要求執行開發調整建立所需的程式或函式

* 步驟1: 整合 Open Router  API，修改相關程式碼
* 步驟2: 協助設定API KEY，並在本地端測試完成
* 步驟3: 上線更新至vercel服務器，並協助提供線上測試頁，來確認ai服務的正常及問題

# API 資訊

* 功能說明：請建立 Open Router  API 整合模組ORAPI.js，需求請依下面敘述

  * SDK：使用  @openrouter/sdk npm 套件
  * API Endpoint：透過 SDK 自動處理,請參考下面TypeScript SDK 程式碼開發
  * 模型：設定為 `google/gemma-3-27b-it:free`，並設置參數在.env下
  * API Key 請從環境變數 .env. 讀取 API_KEY 的值
  * 請將 AIP Key 新增至 .env 檔案中, API_KEY=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
  ** backup：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

    '''TypeScript SDK
 
    import OpenRouter from '@openrouter/sdk';
    const client = new OpenRouter({
    apiKey: process.env.OPENROUTER\_API\_KEY
    });
    const response = await client.chat.send({
    model: "minimax/minimax-m2",
    messages: \[
    { role: "user", content: "Explain quantum computing" }
    ]
    });

    '''

* 實作指數退避重試機制 (Exponential Backoff and Retry)，使用類似 'p-retry' 或 'async-retry' 的庫來實現

# 功能需求

* 需在程式，建立一個system prompt，方便控制ai回覆效果
* 建立一測試頁面，方便開發者了解 api 呼叫回應過程中的問題

# API DOC 請參考

* 請主要參考Open Router API 文件：https://openrouter.ai/docs/quickstart

## 其他參考文件

* API：https://openrouter.ai/docs/api/reference/overview
* SDK：https://openrouter.ai/docs/sdks/typescript/overview
