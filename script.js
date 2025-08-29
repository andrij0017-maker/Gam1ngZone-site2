/* ===== Simple slider + product render ===== */

// Slider basic controls (works by shifting .slides)
document.addEventListener('DOMContentLoaded', ()=>{
  const slides = document.querySelector('.slides');
  let idx = 0;
  function move(n){ 
    const count = slides.children.length;
    idx = (idx + n + count) % count;
    slides.style.transform = `translateX(-${idx*100}%)`;
  }
  document.querySelector('.prev').addEventListener('click', ()=>move(-1));
  document.querySelector('.next').addEventListener('click', ()=>move(+1));

  // ===== DEMO PRODUCTS (easy to edit) =====
  const products = {
    hits: [
      {title:'Гарнітура Attack Shark L80 Pro', price:1899, old:null, tags:['Топ продаж','RGB','Мікрофон'], link:'#'},
      {title:'Клавіатура Royal Kludge R75 (Hot-Swap)', price:2799, old:3199, tags:['Hot-swap','Gateron'], link:'#'},
      {title:'Мишка Logitech G102 Lightsync', price:899, old:1099, tags:['8000 DPI','Легка'], link:'#'},
      {title:'Геймпад Flydigi Vader 4 Pro', price:3299, old:null, tags:['Bluetooth','PC/Android/iOS'], link:'#'}
    ],
    sale: [
      {title:'Мікрофон Fifine K669', price:1499, old:1799, tags:['USB','Кардіоїда'], link:'#'},
      {title:'Маршрутизатор TP-Link Archer AX23', price:2299, old:2699, tags:['Wi‑Fi 6','Dual-Band'], link:'#'},
      {title:'Килимок для миші XXL RGB', price:599, old:799, tags:['900×400','RGB'], link:'#'},
      {title:'USB-C кабель 100W (1м)', price:199, old:299, tags:['PD 100W','Нейлон'], link:'#'}
    ],
    new: [
      {title:'Навушники Sony INZONE H5', price:5799, old:null, tags:['Low-latency','Комфорт'], link:'#'},
      {title:'Клавіатура Akko 5075S', price:3999, old:null, tags:['Гасники','PBT'], link:'#'},
      {title:'Мишка Razer Cobra', price:2199, old:null, tags:['58 г','Speedflex'], link:'#'},
      {title:'Геймпад 8BitDo Ultimate', price:2899, old:null, tags:['Charging Dock','Hall'], link:'#'}
    ]
  };

  function renderSection(id, list){
    const root = document.getElementById(id);
    if(!root) return;
    root.innerHTML = list.map(p => `
      <article class="card">
        <div class="img"></div>
        <h3>${p.title}</h3>
        <div class="badges">${(p.tags||[]).map(t=>`<span class="b">${t}</span>`).join('')}</div>
        <div class="price">
          ${p.old ? `<span class="old">${p.old} грн</span>`:''}
          <span class="new">${p.price} грн</span>
        </div>
        <div class="actions">
          <a class="buy" href="${p.link}" target="_blank" rel="noopener">Купити</a>
        </div>
      </article>
    `).join('');
  }

  renderSection('hits', products.hits);
  renderSection('sale', products.sale);
  renderSection('new', products.new);
});
