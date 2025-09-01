// === CONFIG ===
const BOT_TOKEN = "8365299382:AAGYW1vbTxkYH8tppPNA9XAAvudNSfDcot0";
const CHAT_ID = "8104903132";

// Demo products — replace freely
const products = {
  hits: [
    {title:'Гарнітура Attack Shark L80 Pro', img:'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1200&auto=format&fit=crop', price:1899, old:null, tags:['Топ продаж','RGB','Мікрофон'], link:'#'},
    {title:'Клавіатура Royal Kludge R75 (Hot-Swap)', img:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop', price:2799, old:3199, tags:['Hot-swap','Gateron'], link:'#'},
    {title:'Мишка Logitech G102 Lightsync', img:'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1200&auto=format&fit=crop', price:899, old:1099, tags:['8000 DPI','Легка'], link:'#'},
    {title:'Геймпад Flydigi Vader 4 Pro', img:'https://images.unsplash.com/photo-1584270354949-d3f2a99d4a7a?q=80&w=1200&auto=format&fit=crop', price:3299, old:null, tags:['Bluetooth','PC/Android/iOS'], link:'#'}
  ],
  sale: [
    {title:'Мікрофон Fifine K669', img:'https://images.unsplash.com/photo-1514405700541-0144f3b62a4e?q=80&w=1200&auto=format&fit=crop', price:1499, old:1799, tags:['USB','Кардіоїда'], link:'#'},
    {title:'Маршрутизатор TP-Link Archer AX23', img:'https://images.unsplash.com/photo-1587202372775-98927b65c66c?q=80&w=1200&auto=format&fit=crop', price:2299, old:2699, tags:['Wi‑Fi 6','Dual-Band'], link:'#'},
    {title:'Килимок для миші XXL RGB', img:'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=1200&auto=format&fit=crop', price:599, old:799, tags:['900×400','RGB'], link:'#'},
    {title:'USB-C кабель 100W (1м)', img:'https://images.unsplash.com/photo-1517336714731-3a0b6b4aa6b3?q=80&w=1200&auto=format&fit=crop', price:199, old:299, tags:['PD 100W','Нейлон'], link:'#'}
  ],
  news: [
    {title:'Навушники Sony INZONE H5', img:'https://images.unsplash.com/photo-1510074446693-6e1e03b964de?q=80&w=1200&auto=format&fit=crop', price:5799, old:null, tags:['Low-latency','Комфорт'], link:'#'},
    {title:'Клавіатура Akko 5075S', img:'https://images.unsplash.com/photo-1595224585375-94347af5a08b?q=80&w=1200&auto=format&fit=crop', price:3999, old:null, tags:['Гасники','PBT'], link:'#'},
    {title:'Мишка Razer Cobra', img:'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1200&auto=format&fit=crop', price:2199, old:null, tags:['58 г','Speedflex'], link:'#'},
    {title:'Геймпад 8BitDo Ultimate', img:'https://images.unsplash.com/photo-1585079542156-2755d9df8f2c?q=80&w=1200&auto=format&fit=crop', price:2899, old:null, tags:['Charging Dock','Hall'], link:'#'}
  ]
};

function cardHTML(p){return `
  <article class="card" data-title="${p.title.toLowerCase()}">
    <a class="thumb" href="${p.link}" target="_blank" rel="noopener">
      <img src="${p.img}" alt="${p.title}">
    </a>
    <h3>${p.title}</h3>
    <div class="badges">${(p.tags||[]).map(t=>`<span class="b">${t}</span>`).join('')}</div>
    <div class="price">
      ${p.old ? `<span class="old">${p.old} грн</span>` : ''}
      <span class="new">${p.price} грн</span>
    </div>
    <div class="actions">
      <a class="btn" href="${p.link}" target="_blank" rel="noopener">Детальніше</a>
      <button class="btn" data-order="${p.title}">Замовити</button>
    </div>
  </article>`;}

function mount(id, list){const root=document.getElementById(id); if(!root) return; root.innerHTML=list.map(cardHTML).join('');}

// Search
function setupSearch(){
  const input=document.getElementById('search');
  const emptyNote=document.getElementById('empty-note');
  const allCards=()=>Array.from(document.querySelectorAll('.card'));
  function run(){
    const q=(input.value||'').trim().toLowerCase();
    let visible=0;
    allCards().forEach(c=>{const ok=!q||c.dataset.title.includes(q); c.style.display=ok?'':'none'; if(ok) visible++;});
    emptyNote.style.display=(visible===0)?'block':'none';
  }
  input.addEventListener('input', run);
  run();
}

// Modal + Telegram
function setupOrder(){
  const modal=document.getElementById('order-modal');
  const form=document.getElementById('order-form');
  const productField=document.getElementById('order-product');
  const nameField=document.getElementById('order-name');
  const phoneField=document.getElementById('order-phone');
  const noteField=document.getElementById('order-note');
  const closeBtn=document.getElementById('order-close');

  document.body.addEventListener('click',(e)=>{
    const t=e.target; if(t.matches('button[data-order]')){{productField.value=t.getAttribute('data-order'); modal.classList.add('open');}}
  });
  closeBtn.addEventListener('click',()=>modal.classList.remove('open'));
  modal.addEventListener('click',(e)=>{if(e.target===modal) modal.classList.remove('open');});

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const text=[
      "🛒 НОВЕ ЗАМОВЛЕННЯ",
      `📦 Товар: ${productField.value}`,
      `👤 Ім'я: ${nameField.value}`,
      `📞 Телефон: ${phoneField.value}`,
      noteField.value?`💬 Коментар: ${noteField.value}`:null
    ].filter(Boolean).join('\n');

    const params=new URLSearchParams(); params.append('chat_id', CHAT_ID); params.append('text', text);

    try{const res=await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{{method:'POST',headers:{{'Content-Type':'application/x-www-form-urlencoded'}},body:params.toString()}});
      if(!res.ok) throw new Error('Network');
      alert('✅ Замовлення відправлено! Ми скоро з вами звʼяжемось.');
      modal.classList.remove('open'); form.reset();
    }catch(err){alert('❌ Помилка відправки. Спробуйте ще раз або напишіть у Telegram.');}
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  mount('hits-grid',products.hits);
  mount('sale-grid',products.sale);
  mount('news-grid',products.news);
  document.getElementById('year').textContent=new Date().getFullYear();
  setupSearch();
  setupOrder();
});
