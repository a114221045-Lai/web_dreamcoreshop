:root{
  --primary: #1F2A44;
  --secondary: #7B7289;
  --accent: #F2E2A2;
  --bg: #0e1322;
  --text: #e6e6eb;
  --border: rgba(123, 114, 137, 0.15);
}

*{box-sizing:border-box}

/* 無障礙相關樣式 */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--accent);
  color: var(--primary);
  padding: 8px;
  text-decoration: none;
  z-index: 100;
  border-radius: 0 0 4px 0;
}

.skip-link:focus {
  top: 0;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

body{
  margin:0;
  font-family:system-ui,-apple-system,"Segoe UI",Roboto,'Noto Sans TC',sans-serif;
  background:var(--bg);
  color:var(--text);
  line-height:1.5;
}

.container{max-width:1100px;margin:0 auto;padding:24px}

.site-header{
  background:linear-gradient(180deg, rgba(31,42,68,0.95), rgba(31,42,68,0.85));
  border-bottom:1px solid var(--border);
  padding: 0;
}

.site-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
}

.logo{
  margin:0;
  font-size:1.4rem;
  color: var(--accent);
  letter-spacing: 2px;
}

.nav {
  display: flex;
  gap: 24px;
}

.nav a{
  color:var(--secondary);
  text-decoration:none;
  transition: color 0.3s ease;
}

.nav a:hover {
  color: var(--accent);
}

.hero{
  padding:48px 0;
  text-align:center;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.hero-content {
  flex: 1;
  min-width: 300px;
}

.hero h2 {
  margin: 0 0 16px 0;
  font-size: 2rem;
  color: var(--accent);
}

.lead{
  color:var(--secondary);
  font-size: 1.1rem;
  margin: 0;
}

.card{
  background:rgba(255,255,255,0.02);
  padding:24px;
  margin:24px 0;
  border-radius:8px;
  border: 1px solid var(--border);
  backdrop-filter: blur(10px);
}

.card h3 {
  margin-top: 0;
  color: var(--accent);
}

.grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:16px;
}

.product-item {
  background: rgba(31, 42, 68, 0.4);
  padding: 16px;
  border-radius: 6px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 280px;
  display: flex;
  flex-direction: column;
}

.product-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(242, 226, 162, 0.1), transparent);
  transition: left 0.5s ease;
}

.product-item:hover {
  border-color: var(--accent);
  background: rgba(31, 42, 68, 0.6);
  box-shadow: 0 0 12px rgba(242, 226, 162, 0.15);
  transform: translateY(-2px);
}

.product-item:hover::before {
  left: 100%;
}

.product-item h4 {
  margin: 0 0 8px 0;
  color: var(--accent);
  font-size: 1rem;
  position: relative;
  z-index: 1;
}

.product-item p {
  color: var(--secondary);
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0 0 12px 0;
  flex-grow: 1;
  position: relative;
  z-index: 1;
}

.product-item small {
  color: var(--text);
  font-weight: bold;
  font-size: 1rem;
  position: relative;
  z-index: 1;
}

.buy {
  background: var(--accent);
  color: var(--primary);
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 12px;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

.buy:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(242, 226, 162, 0.3);
}

.buy:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

form label {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  color: var(--accent);
  font-weight: 500;
}

form label input,
form label textarea {
  background: rgba(31, 42, 68, 0.6);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 8px;
  border-radius: 4px;
  font-family: inherit;
  margin-top: 4px;
}

form label input:focus,
form label textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 4px rgba(242, 226, 162, 0.2);
}

form button {
  background: var(--accent);
  color: var(--primary);
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease;
}

form button:hover {
  transform: scale(1.05);
}

/* Footer */
.site-footer {
  margin-top: 48px;
  padding: 24px;
  background: linear-gradient(180deg, rgba(31,42,68,0.95), rgba(31,42,68,0.85));
  border-top: 1px solid var(--border);
  text-align: center;
}

.site-footer p {
  margin: 0;
  color: var(--secondary);
  font-size: 0.9rem;
}

.site-footer a {
  color: var(--accent);
  text-decoration: none;
  transition: color 0.3s ease;
}

.site-footer a:hover {
  text-decoration: underline;
}

/* Chat Widget */
.chat-widget{
  position:fixed;
  right:18px;
  bottom:18px;
  font-size: 0.9rem;
  z-index: 999;
}

.chat-toggle {
  background: var(--accent);
  color: var(--primary);
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.chat-toggle:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(242, 226, 162, 0.3);
}

.chat-container {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 360px;
  height: 480px;
  background: linear-gradient(180deg, rgba(31,42,68,0.95), rgba(31,42,68,0.9));
  border: 1px solid var(--border);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 16px rgba(0,0,0,0.4);
  overflow: hidden;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}

.chat-header h4 {
  margin: 0;
  color: var(--accent);
}

.close-btn {
  background: none;
  border: none;
  color: var(--secondary);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
}

.close-btn:hover {
  color: var(--accent);
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message {
  padding: 8px 12px;
  border-radius: 6px;
  max-width: 85%;
  word-wrap: break-word;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.message.user {
  background: var(--primary);
  color: var(--accent);
  align-self: flex-end;
  border: 1px solid var(--secondary);
}

.message.bot {
  background: rgba(123, 114, 137, 0.3);
  color: var(--text);
  border: 1px solid var(--border);
}

.message.loading {
  color: var(--secondary);
  font-style: italic;
}

.input-area {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid var(--border);
}

#chat-input {
  flex: 1;
  background: rgba(31, 42, 68, 0.6);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 8px 12px;
  border-radius: 4px;
  font-family: inherit;
}

#chat-input:focus {
  outline: none;
  border-color: var(--accent);
}

.send-btn {
  background: var(--accent);
  color: var(--primary);
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;
}

.send-btn:hover {
  transform: scale(1.05);
}

/* Cart Button */
.cart-btn {
  background: var(--accent);
  color: var(--primary);
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;
  margin-left: 16px;
}

.cart-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(242, 226, 162, 0.3);
}

/* Cart Section */
#cart-items {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  background: rgba(31, 42, 68, 0.4);
  border: 1px solid var(--border);
  border-radius: 4px;
}

.cart-item-info {
  flex: 1;
}

.cart-item-title {
  color: var(--accent);
  font-weight: bold;
  margin: 0;
}

.cart-item-price {
  color: var(--secondary);
  margin: 4px 0 0 0;
}

.cart-item-qty {
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 0 16px;
}

.qty-btn {
  background: var(--secondary);
  color: var(--text);
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 2px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;
}

.qty-btn:hover {
  background: var(--accent);
  color: var(--primary);
}

.remove-btn {
  background: rgba(242, 226, 162, 0.2);
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 6px 10px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background: var(--accent);
  color: var(--primary);
}

.cart-summary {
  padding: 16px;
  background: rgba(31, 42, 68, 0.4);
  border: 1px solid var(--border);
  border-radius: 4px;
}

.cart-summary p {
  margin: 0 0 16px 0;
  font-size: 1.1rem;
  color: var(--accent);
  font-weight: bold;
}

.checkout-btn, .back-btn {
  background: var(--accent);
  color: var(--primary);
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 8px;
  transition: all 0.2s ease;
}

.checkout-btn:hover, .back-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(242, 226, 162, 0.3);
}

.back-btn {
  background: var(--secondary);
}

.empty-cart-msg {
  text-align: center;
  padding: 32px;
  color: var(--secondary);
  font-style: italic;
}

.hidden {
  display: none !important;
}

@media (max-width:600px){
  .nav {
    display: none;
  }
  
  .container {
    padding: 12px;
  }
  
  .chat-container {
    width: calc(100vw - 24px);
    height: 60vh;
    right: 12px;
    bottom: auto;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .hero h2 {
    font-size: 1.5rem;
  }
}
