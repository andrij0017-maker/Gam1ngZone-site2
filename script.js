
const BOT_TOKEN = "8365299382:AAGYW1vbTxkYH8tppPNA9XAAvudNSfDcot0";
const CHAT_ID = "8104903132";

function openOrderForm(productName) {
  document.getElementById("order-form").classList.remove("hidden");
  document.getElementById("product").value = productName;
}

document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();
  const product = document.getElementById("product").value;
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  const message = `🛒 Нове замовлення:%0A📦 Товар: ${product}%0A👤 Ім'я: ${name}%0A📞 Телефон: ${phone}`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${message}`)
    .then(res => alert("Замовлення успішно відправлено! Ми з вами зв'яжемось."))
    .catch(err => alert("Помилка відправки. Спробуйте ще раз."));
});
