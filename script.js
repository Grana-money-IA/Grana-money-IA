// Stripe Chave publicavel 
pk_test_51SQWCUD2yUVCR4xU80UabulobqK1Qt0APEsGymb1J8nEa3ErAcem0qG3z65XnNHaF5BQrzDfuaS0egGfsDv4DDv000w3IWYidd);

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
