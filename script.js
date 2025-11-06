document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const alvo = document.querySelector(this.getAttribute('href'));
    if (alvo) alvo.scrollIntoView({ behavior: 'smooth' });
  });
});
// Substitua pela sua chave pública de teste do Stripe
const stripe =price_1SQZuMDnXcpIZEtBrexTYyYC

document.getElementById("checkout-one-time").addEventListener("click", async () => {
  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId: "price_ONE_TIME_ID" }) // coloque o Price ID do pagamento único
  });
  const { id } = await res.json();
  await stripe.redirectToCheckout({ sessionId: id });
});

document.getElementById("checkout-subscription").addEventListener("click", async () => {
  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId: "price_RECURRING_ID" }) // coloque o Price ID da assinatura
  });
  const { id } = await res.json();
  await stripe.redirectToCheckout({ sessionId: id });
});
