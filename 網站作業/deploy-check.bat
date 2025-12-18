@echo off
setlocal enabledelayedexpansion
REM 🚀 Vercel 部署前檢查清單 (Windows)

echo.
echo ==========================================
echo 🚀 AI 客服系統 - Vercel 部署檢查 (Windows)
echo ==========================================
echo.

REM 檢查 Node.js
echo 1️⃣ 檢查 Node.js...
where node >nul 2>nul
if errorlevel 1 (
    echo   ❌ Node.js 未安裝
    goto error
) else (
    for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
    echo   ✅ Node.js: !NODE_VERSION!
)

REM 檢查 npm
echo.
echo 2️⃣ 檢查 npm...
where npm >nul 2>nul
if errorlevel 1 (
    echo   ❌ npm 未安裝
    goto error
) else (
    for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
    echo   ✅ npm: !NPM_VERSION!
)

REM 檢查 node_modules
echo.
echo 3️⃣ 檢查依賴...
if exist "node_modules" (
    echo   ✅ node_modules 存在
) else (
    echo   ⚠️ node_modules 不存在，運行 npm install...
    call npm install
)

REM 檢查 .env 文件
echo.
echo 4️⃣ 檢查環境配置...
if exist ".env" (
    echo   ✅ .env 文件存在
    findstr /m "OPENROUTER_API_KEY" .env >nul 2>nul
    if errorlevel 1 (
        echo   ⚠️ OPENROUTER_API_KEY 未在 .env 中
    ) else (
        echo   ✅ OPENROUTER_API_KEY 已配置
    )
) else (
    echo   ⚠️ .env 文件不存在
    if exist ".env.example" (
        echo   複製 .env.example...
        copy .env.example .env >nul
    )
)

REM 檢查必要文件
echo.
echo 5️⃣ 檢查必要文件...
set files=backend\server.js backend\ORAPI.js package.json vercel.json online-test.html debug-test.html
for %%f in (%files%) do (
    if exist "%%f" (
        echo   ✅ %%f
    ) else (
        echo   ❌ %%f 缺失
    )
)

REM 檢查 Git
echo.
echo 6️⃣ 檢查 Git...
where git >nul 2>nul
if errorlevel 1 (
    echo   ⚠️ Git 未安裝或未在 PATH 中
) else (
    echo   ✅ Git 已安裝
    if exist ".git" (
        echo   ✅ Git 倉庫已初始化
    ) else (
        echo   ⚠️ Git 倉庫未初始化
    )
)

REM 檢查 Vercel CLI
echo.
echo 7️⃣ 檢查 Vercel CLI...
where vercel >nul 2>nul
if errorlevel 1 (
    echo   ⚠️ Vercel CLI 未安裝
    echo   運行: npm install -g vercel
) else (
    for /f "tokens=*" %%i in ('vercel --version') do set VERCEL_VERSION=%%i
    echo   ✅ Vercel CLI: !VERCEL_VERSION!
)

echo.
echo ==========================================
echo ✅ 部署前檢查完成！
echo ==========================================
echo.
echo 後續步驟：
echo 1. 確保 .env 中的 OPENROUTER_API_KEY 正確
echo 2. 運行本地測試: npm start
echo 3. 訪問 http://localhost:3000/online-test.html 測試
echo 4. 提交更改: git add -A ^&^& git commit -m "ready for deployment"
echo 5. 部署到 Vercel: vercel deploy --prod
echo.
pause
goto end

:error
echo.
echo ❌ 檢查失敗，請安裝缺失的工具
echo.
pause

:end
endlocal
