// Rolagem suave (opcional, se tiver links internos)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const alvo = document.querySelector(this.getAttribute('href'));
    if (alvo) alvo.scrollIntoView({ behavior: 'smooth' });
  });
});

// Stripe - sua chave pública
const stripe = Stripe("pk_live_51SQWCCDnXcpIZEtBhJrNTuVbgC2y0PaCeIcBKw45lFaAzuVoqL5EeoMzOaLPIyOaeiZEldzLAVvKH4XdXOR6uM7u00VhN8hypI");

// Botão de pagamento único
document.getElementById("checkout-button").addEventListener("click", async () => {
  try {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId:// Price ID do seu produto
      })prod_TNKZ76el7fsMPu
    });

    const { id } = await res.json();
    await stripe.redirectToCheckout({ sessionId: id });
  } catch (err) {
    console.error(err);
    alert("Erro ao iniciar o pagamento. Veja o console para detalhes.");
  }
});
