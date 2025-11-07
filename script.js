// Stripe public key
const stripe = Stripe("pk_live_51SQWCCDnXcpIZEtBhJrNTuVbgC2y0PaCeIcBKw45lFaAzuVoqL5EeoMzOaLPIyOaeiZEldzLAVvKH4XdXOR6uM7u00VhN8hypI");

// Seleciona o botão de checkout
const checkoutButton = document.getElementById("checkout-button");

checkoutButton.addEventListener("click", async () => {
  try {
    // Cria a sessão de checkout no backend
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId: "price_1SQZuMDnXcpIZEtBrexTYyYC"
      })
    });

    const session = await res.json();

    // Redireciona para o Stripe Checkout
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      alert(result.error.message);
    }
  } catch (err) {
    console.error("Erro ao criar sessão de checkout:", err);
    alert("Ocorreu um erro ao tentar iniciar o pagamento.");
  }
});
