
// Rolagem suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const alvo = document.querySelector(this.getAttribute('href'));
    if (alvo) alvo.scrollIntoView({ behavior: 'smooth' });
  });
});

// Stripe - chave pública do seu projeto
const stripe = Stripe("pk_live_51SQWCCDnXcpIZEtBhJrNTuVbgC2y0PaCeIcBKw45lFaAzuVoqL5EeoMzOaLPIyOaeiZEldzLAVvKH4XdXOR6uM7u00VhN8hypI");

// Botão de pagamento único
document.getElementById("checkout-one-time").addEventListener("click", async () => {
  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId: "price_1SQZuMDnXcpIZEtBrexTYyYC" }) // Price ID do pagamento único
  });
  const { id } = await res.json();
  await stripe.redirectToCheckout({ sessionId: id });
});

// Botão de assinatura (se tiver assinatura, substitua o Price ID)
document.getElementById("checkout-subscription").addEventListener("click", async () => {
  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId: "price_RECURRING_ID" }) // Price ID da assinatura
  });
  const { id } = await res.json();
  await stripe.redirectToCheckout({ sessionId: id });
});
