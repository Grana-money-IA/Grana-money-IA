
// Rolagem suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const alvo = document.querySelector(this.getAttribute('href'));
    if (alvo) alvo.scrollIntoView({ behavior: 'smooth' });
  });
});

// Substitua pela sua chave pública do Stripe
const stripe = Stripe("pk_live_51SQWCCDnXcpIZEtBhJrNTuVbgC2y0PaCeIcBKw45lFaAzuVoqL5EeoMzOaLPIyOaeiZEldzLAVvKH4XdXOR6uM7u00VhN8hypI");

// Pagamento único
document.getElementById("checkout-one-time").addEventListener("click", async () => {
  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId: "price_1SQZuMDnXcpIZEtBrexTYyYC", mode: "payment" })
  });
  const { id } = await res.json();
  await stripe.redirectToCheckout({ sessionId: id });
});

// Assinatura mensal
document.getElementById("checkout-subscription").addEventListener("click", async () => {
  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId: "price_1SQZuMDnXcpIZEtBrexTYyYC", mode: "subscription" })
  });
  const { id } = await res.json();
  await stripe.redirectToCheckout({ sessionId: id });
});
const btnOneTime = document.getElementById("checkout-one-time");
const btnSubscription = document.getElementById("checkout-subscription");

btnOneTime.addEventListener("click", () => {
  alert("Compra única funcionando!");
});

btnSubscription.addEventListener("click", () => {
  alert("Assinatura funcionando!");
});
