// Stripe - chave pública
const stripe = Stripe("pk_test_51SQWCUD2yUVCR4xU80UabulobqK1Qt0APEsGymb1J8nEa3ErAcem0qG3z65XnNHaF5BQrzDfuaS0egGfsDv4DDv000w3IWYidd");

// Botão de checkout
const checkoutButton = document.getElementById("checkout-button");

checkoutButton.addEventListener("click", async () => {
  try {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId: "price_1SQZuMDnXcpIZEtBrexTYyYC" // Price ID do produto
      })
    });

    const session = await res.json();

    if (session.id) {
      await stripe.redirectToCheckout({ sessionId: session.id });
    } else {
      alert("Erro ao iniciar o pagamento. Tente novamente.");
    }
  } catch (err) {
    console.error("Erro ao iniciar o checkout:", err);
    alert("Falha na comunicação com o servidor.");
  }
});
