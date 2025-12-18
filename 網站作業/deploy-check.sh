#!/bin/bash
# 🚀 Vercel 部署前檢查清單

echo "=========================================="
echo "🚀 AI 客服系統 - Vercel 部署檢查"
echo "=========================================="
echo ""

# 檢查 Node.js 版本
echo "1️⃣ 檢查 Node.js 版本..."
node_version=$(node -v)
echo "   ✅ Node.js: $node_version"

# 檢查 npm
echo ""
echo "2️⃣ 檢查 npm..."
npm_version=$(npm -v)
echo "   ✅ npm: $npm_version"

# 檢查依賴
echo ""
echo "3️⃣ 檢查依賴安裝..."
if [ -d "node_modules" ]; then
    echo "   ✅ node_modules 存在"
else
    echo "   ⚠️ node_modules 不存在，運行 npm install..."
    npm install
fi

# 檢查 .env 文件
echo ""
echo "4️⃣ 檢查環境配置..."
if [ -f ".env" ]; then
    echo "   ✅ .env 文件存在"
    if grep -q "OPENROUTER_API_KEY" .env; then
        echo "   ✅ OPENROUTER_API_KEY 已配置"
    else
        echo "   ⚠️ OPENROUTER_API_KEY 未在 .env 中"
    fi
else
    echo "   ⚠️ .env 文件不存在"
    echo "   複製 .env.example..."
    cp .env.example .env
fi

# 檢查必要文件
echo ""
echo "5️⃣ 檢查必要文件..."
files=("backend/server.js" "backend/ORAPI.js" "package.json" "vercel.json" "online-test.html" "debug-test.html")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file"
    else
        echo "   ❌ $file 缺失"
    fi
done

# 檢查 git
echo ""
echo "6️⃣ 檢查 Git..."
if command -v git &> /dev/null; then
    echo "   ✅ Git 已安裝"
    if [ -d ".git" ]; then
        echo "   ✅ Git 倉庫已初始化"
    else
        echo "   ⚠️ Git 倉庫未初始化"
    fi
else
    echo "   ❌ Git 未安裝"
fi

# 檢查 Vercel CLI
echo ""
echo "7️⃣ 檢查 Vercel CLI..."
if command -v vercel &> /dev/null; then
    vercel_version=$(vercel --version)
    echo "   ✅ Vercel CLI: $vercel_version"
else
    echo "   ⚠️ Vercel CLI 未安裝"
    echo "   運行: npm install -g vercel"
fi

echo ""
echo "=========================================="
echo "✅ 部署前檢查完成！"
echo "=========================================="
echo ""
echo "後續步驟："
echo "1. 確保 .env 中的 OPENROUTER_API_KEY 正確"
echo "2. 運行本地測試: npm start"
echo "3. 訪問 http://localhost:3000/online-test.html 測試"
echo "4. 提交更改: git add -A && git commit -m 'ready for deployment'"
echo "5. 部署到 Vercel: vercel deploy --prod"
echo ""
