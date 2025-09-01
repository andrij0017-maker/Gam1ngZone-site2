document.addEventListener("DOMContentLoaded", () => {
  const orderModal = document.getElementById("order-modal");
  const orderProduct = document.getElementById("order-product");
  const orderClose = document.getElementById("order-close");
  const orderForm = document.getElementById("order-form");

  // Відкриття модалки
  document.querySelectorAll(".btn-order").forEach(btn => {
    btn.addEventListener("click", () => {
      orderProduct.value = btn.dataset.order;
      orderModal.style.display = "flex";
    });
  });

  // Закрити
  orderClose.addEventListener("click", () => {
    orderModal.style.display = "none";
  });

  // Відправка
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Замовлення відправлено!");
    orderModal.style.display = "none";
    orderForm.reset();
  });

  // Пошук
  const search = document.getElementById("search");
  search.addEventListener("input", () => {
    const term = search.value.toLowerCase();
    document.querySelectorAll(".card").forEach(card => {
      const title = card.dataset.title;
      card.style.display = title.includes(term) ? "block" : "none";
    });
  });
});
