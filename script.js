// ===== Demo products with external images (easy to replace) =====
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

function cardHTML(p){
  return `
    <article class="card">
      <a class="img" href="${p.link}" target="_blank" rel="noopener">
        <img src="${p.img}" alt="${p.title}">
      </a>
      <h3>${p.title}</h3>
      <div class="badges">${(p.tags||[]).map(t=>`<span class="b">${t}</span>`).join('')}</div>
      <div class="price">
        ${p.old ? `<span class="old">${p.old} грн</span>` : ''}
        <span class="new">${p.price} грн</span>
      </div>
      <div class="actions">
        <a class="buy" href="${p.link}" target="_blank" rel="noopener">Купити</a>
      </div>
    </article>
  `;
}

function renderSection(rootId, list){
  const root = document.getElementById(rootId);
  if(!root) return;
  root.innerHTML = list.map(cardHTML).join('');
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderSection('hits', products.hits);
  renderSection('sale', products.sale);
  renderSection('news', products.news);
});
