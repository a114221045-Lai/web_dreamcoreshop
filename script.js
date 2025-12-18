/**
 * 前端應用程式主要邏輯
 * 包含產品載入、聯絡表單、AI 聊天 widget
 */

document.addEventListener('DOMContentLoaded', () => {
  // ============ 商品載入 ============
  const productsEl = document.getElementById('product-list')
  const dreamcoreProducts = [
    { id: 1, title: '破舊的泰迪熊', price: 'NT$800', desc: '一隻眼睛脫落，卻仍直直望著你。沒有人記得它原本屬於誰。' },
    { id: 2, title: '老式電話（旋轉撥號）', price: 'NT$1,200', desc: '電話鈴會在沒有接線的情況下響起。你總覺得那通電話是打給過去的自己。' },
    { id: 3, title: 'CRT 厚殼電視', price: 'NT$2,500', desc: '螢幕永遠停在雪花畫面，卻偶爾閃過熟悉的房間。電視從未插上電源。' },
    { id: 4, title: '錯誤運作的時鐘', price: 'NT$950', desc: '指針以不規則的方式轉動。彷彿它並不是在計時，而是在等待某個瞬間。' },
    { id: 5, title: '缺一角的相框', price: 'NT$600', desc: '相框裡的照片已經泛黃，人物的臉模糊不清。只是沒有人記得他是誰。' },
    { id: 6, title: '模糊不清的照片', price: 'NT$450', desc: '照片中的背景異常清晰，唯獨人影像被抹去。那張照片好像在提醒你曾經到過那裡。' },
    { id: 7, title: '童年用的書包', price: 'NT$750', desc: '拉鍊卡死，怎麼也打不開。背起它時，重量卻明顯超出應有的範圍。' },
    { id: 8, title: '斷電卻亮著的檯燈', price: 'NT$880', desc: '燈泡發出溫暖卻不自然的光。即使拔掉插頭，它仍然亮著。' },
    { id: 9, title: '撕破的課本', price: 'NT$320', desc: '書頁被粗暴地扯下，只剩零碎的章節。你懷疑自己曾經為了考試翻過它無數次。' },
    { id: 10, title: '鏡子（映不出自己）', price: 'NT$1,500', desc: '鏡面乾淨無比，卻只反射出空房間。你站在它前面，卻不存在於畫面中。' },
    { id: 11, title: '老舊錄音帶', price: 'NT$550', desc: '標籤上的字已經褪色。播放時，只能聽見斷斷續續的低語，像是在回放一場夢。' },
    { id: 12, title: '卡帶播放機', price: 'NT$1,100', desc: '按鍵按下去會卡住，無法彈回。音樂反覆播放同一小段旋律，沒有開頭也沒有結尾。' },
    { id: 13, title: '沒有頁碼的日記本', price: 'NT$680', desc: '每一頁都是同一天的日期。字跡時而熟悉，時而陌生。最後一頁還沒寫完。' },
    { id: 14, title: '掉色的氣球', price: 'NT$320', desc: '氣球永遠不會洩氣，卻慢慢失去顏色。它輕輕飄在空中，像是在等待某個孩子回來。' },
    { id: 15, title: '破裂的音樂盒', price: 'NT$750', desc: '旋轉時會發出刺耳的聲音。旋律被拉長、扭曲，聽不出原本的曲調。' },
    { id: 16, title: '脫落指針的手錶', price: 'NT$580', desc: '錶面只剩刻度，沒有任何指針。它仍然在滴答作響。彷彿時間已經離開，卻留下了聲音。' },
    { id: 17, title: '沒有標題的 VHS 錄影帶', price: 'NT$450', desc: '播放後出現的是一段空房間的畫面。鏡頭一動不動，卻讓人感到被注視。' },
    { id: 18, title: '扭曲畫面的遙控器', price: 'NT$520', desc: '每按一次，畫面就更失真一些。按鍵上沒有任何標示。' },
    { id: 19, title: '發出雜音的收音機', price: 'NT$620', desc: '頻道無法調整，只剩下連續的沙沙聲。偶爾會插入一句完整的話。' },
    { id: 20, title: '不存在的門鑰匙', price: 'NT$480', desc: '鑰匙冰冷沉重，卻找不到對應的門。你確信它曾經打開過某個重要的地方。' },
    { id: 21, title: '半融化的蠟筆', price: 'NT$280', desc: '顏色混在一起，再也分不開。畫出的線條會慢慢消失。' },
    { id: 22, title: '顏色錯位的積木', price: 'NT$420', desc: '每一塊的顏色都不在正確的位置上。無論怎麼拼，都無法完成原本的形狀。' },
    { id: 23, title: '沒有封面的故事書', price: 'NT$350', desc: '第一頁直接從中間開始。你翻到結局時，卻發現內容改變了。' },
    { id: 24, title: '裂開的塑膠面具', price: 'NT$390', desc: '面具的笑容停留在最不自然的角度。戴上它時，周圍的人彷彿看不見你。' },
    { id: 25, title: '看不清指針的指南針', price: 'NT$510', desc: '指針不停旋轉，無法指向任何方向。它只是提醒你已經迷失。' }
  ]
  
  dreamcoreProducts.forEach(p => {
    const el = document.createElement('article')
    el.className = 'product-item'
    el.innerHTML = `
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <small>${p.price}</small><br/>
      <button class="buy" data-id="${p.id}">加入購物車</button>
    `
    productsEl.appendChild(el)
  })

  // ============ 聊天 Widget ============
  const openBtn = document.getElementById('open-chat')
  const closeBtn = document.getElementById('close-chat')
  const chatBox = document.getElementById('chat-box')
  const messagesEl = document.getElementById('messages')
  const inputEl = document.getElementById('chat-input')
  const sendBtn = document.getElementById('send')

  /**
   * 切換聊天窗口顯示/隱藏
   */
  openBtn.addEventListener('click', () => {
    chatBox.classList.toggle('hidden')
    if (!chatBox.classList.contains('hidden')) {
      inputEl.focus()
    }
  })

  /**
   * 關閉聊天窗口
   */
  closeBtn.addEventListener('click', () => {
    chatBox.classList.add('hidden')
  })

  /**
   * 傳送聊天訊息至後端
   */
  async function sendMessage() {
    const userText = inputEl.value.trim()
    if (!userText) return

    // 清空輸入框
    inputEl.value = ''

    // 顯示使用者訊息
    const userMsgEl = document.createElement('div')
    userMsgEl.className = 'message user'
    userMsgEl.textContent = userText
    messagesEl.appendChild(userMsgEl)
    messagesEl.scrollTop = messagesEl.scrollHeight

    // 顯示載入中提示
    const loadingEl = document.createElement('div')
    loadingEl.className = 'message bot loading'
    loadingEl.textContent = 'AI 正在思考...'
    messagesEl.appendChild(loadingEl)
    messagesEl.scrollTop = messagesEl.scrollHeight

    try {
      // 呼叫後端 /api/chat
      const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:3000/api/chat'
        : `${window.location.origin}/api/chat`
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: userText }],
          model: 'google/gemma-3-27b-it:free'
        })
      })

      const data = await response.json()
      
      // 移除載入提示
      messagesEl.removeChild(loadingEl)

      if (!response.ok || !data.ok) {
        const errorMsg = data.error || '無法取得回應，請檢查網路連線或 API 設定。'
        const botMsgEl = document.createElement('div')
        botMsgEl.className = 'message bot'
        botMsgEl.textContent = `錯誤：${errorMsg}`
        messagesEl.appendChild(botMsgEl)
      } else {
        // 解析 AI 回應
        const aiResponse = data.response?.choices?.[0]?.message?.content || '無法解析回應'
        const botMsgEl = document.createElement('div')
        botMsgEl.className = 'message bot'
        botMsgEl.textContent = aiResponse
        messagesEl.appendChild(botMsgEl)
      }
    } catch (err) {
      messagesEl.removeChild(loadingEl)
      const botMsgEl = document.createElement('div')
      botMsgEl.className = 'message bot'
      botMsgEl.textContent = `異常：${err.message}`
      messagesEl.appendChild(botMsgEl)
      console.error('Chat error:', err)
    }

    messagesEl.scrollTop = messagesEl.scrollHeight
  }

  /**
   * 送出按鈕點擊事件
   */
  sendBtn.addEventListener('click', sendMessage)

  /**
   * Enter 鍵送出訊息
   */
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  })

  // ============ 聯絡表單 ============
  const contactForm = document.getElementById('contact-form')
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(contactForm)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')
    
    try {
      const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:3000/api/contact'
        : `${window.location.origin}/api/contact`
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })

      const data = await response.json()
      
      if (response.ok && data.ok) {
        alert('✅ ' + data.message)
        contactForm.reset()
      } else {
        alert('❌ 錯誤：' + (data.error || '無法發送訊息'))
      }
    } catch (err) {
      console.error('Contact form error:', err)
      alert('❌ 發送失敗：' + err.message)
    }
  })

  // ============ 購物車功能 ============
  let cart = JSON.parse(localStorage.getItem('cart') || '[]')
  
  /**
   * 更新購物車計數顯示
   */
  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0)
    const cartCountEl = document.getElementById('cart-count')
    if (cartCountEl) cartCountEl.textContent = count
  }
  
  /**
   * 渲染購物車內容
   */
  function renderCart() {
    const cartItemsEl = document.getElementById('cart-items')
    if (!cartItemsEl) return
    
    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<div class="empty-cart-msg">購物車是空的</div>'
      document.getElementById('subtotal').textContent = '0'
      return
    }
    
    cartItemsEl.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <div class="cart-item-info">
          <p class="cart-item-title">${item.title}</p>
          <p class="cart-item-price">單價: NT$${item.price}</p>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" data-idx="${idx}" data-action="minus">−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" data-idx="${idx}" data-action="plus">+</button>
        </div>
        <button class="remove-btn" data-idx="${idx}">移除</button>
      </div>
    `).join('')
    
    // 計算小計
    const subtotal = cart.reduce((sum, item) => {
      const price = parseInt(item.price.replace('NT$', '').replace(/,/g, ''))
      return sum + (price * item.quantity)
    }, 0)
    document.getElementById('subtotal').textContent = subtotal.toLocaleString()
    
    // 數量按鈕事件
    document.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.idx)
        const action = e.target.dataset.action
        if (action === 'plus') {
          cart[idx].quantity++
        } else if (action === 'minus' && cart[idx].quantity > 1) {
          cart[idx].quantity--
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        renderCart()
        updateCartCount()
      })
    })
    
    // 移除按鈕事件
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.idx)
        cart.splice(idx, 1)
        localStorage.setItem('cart', JSON.stringify(cart))
        renderCart()
        updateCartCount()
      })
    })
  }
  
  // 初始化購物車計數
  updateCartCount()
  
  // 購物車視圖切換
  const cartViewBtn = document.getElementById('cart-view-btn')
  const backToShopBtn = document.getElementById('back-to-shop-btn')
  const checkoutBtn = document.getElementById('checkout-btn')
  const cartSection = document.getElementById('cart-section')
  const productsSection = document.getElementById('products')
  const contactSection = document.getElementById('contact')
  const aboutSection = document.getElementById('about')
  
  if (cartViewBtn) {
    cartViewBtn.addEventListener('click', () => {
      productsSection.classList.add('hidden')
      aboutSection.classList.add('hidden')
      contactSection.classList.add('hidden')
      cartSection.classList.remove('hidden')
      renderCart()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }
  
  if (backToShopBtn) {
    backToShopBtn.addEventListener('click', () => {
      cartSection.classList.add('hidden')
      productsSection.classList.remove('hidden')
      aboutSection.classList.remove('hidden')
      contactSection.classList.remove('hidden')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('購物車是空的，請先添加商品')
        return
      }
      alert('✅ 感謝您的購買！這是一個演示網站，實際結帳功能待開發。')
      cart = []
      localStorage.setItem('cart', JSON.stringify(cart))
      updateCartCount()
      renderCart()
    })
  }
  
  // 購物車項目添加
  document.querySelectorAll('.buy').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = e.target.dataset.id
      const productTitle = e.target.closest('.product-item').querySelector('h4').textContent
      const productPrice = e.target.closest('.product-item').querySelector('small').textContent
      
      // 新增至購物車
      const existing = cart.find(item => item.id === productId)
      if (existing) {
        existing.quantity++
      } else {
        cart.push({ id: productId, title: productTitle, price: productPrice, quantity: 1 })
      }
      
      localStorage.setItem('cart', JSON.stringify(cart))
      updateCartCount()
      e.target.textContent = '✓ 已加入'
      e.target.disabled = true
      
      setTimeout(() => {
        e.target.textContent = '加入購物車'
        e.target.disabled = false
      }, 2000)
    })
  })
})
