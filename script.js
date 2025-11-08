// Rolagem suave para links internos (opcional)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const alvo = document.querySelector(this.getAttribute('href'));
    if (alvo) alvo.scrollIntoView({ behavior: 'smooth' });
  });
});

// Stripe
const stripe = Stripe("pk_test_51SQWCUD2yUVCR4xU80UabulobqK1Qt0APEsGymb1J8nEa3ErAcem0qG3z65XnNHaF5BQrzDfuaS0egGfsDv4DDv000w3IWYidd");

// Botão de pagamento único
document.getElementById("checkout-one-time").addEventListener("click", async () => {
  try {
    const res = await fetch("/api/create-checkout-session.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId: "price_1SQZuMDnXcpIZEtBrexTYyYC" })
    });
    const session = await res.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    alert("Erro ao iniciar o pagamento. Veja o console para detalhes.");
  }
});

// Botão de assinatura mensal
document.getElementById("checkout-subscription").addEventListener("click", async () => {
  try {
    const res = await fetch("/api/create-checkout-session.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId: "price_1SQZvhDnXcpIZEtBqcIQq7XE" })
    });
    const session = await res.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    alert("Erro ao iniciar o pagamento. Veja o console para detalhes.");
  }
});
