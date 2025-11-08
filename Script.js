const stripe = Stripe("pk_test_51SQWCUD2yUVCR4xU80UabulobqK1Qt0APEsGymb1J8nEa3ErAcem0qG3z65XnNHaF5BQrzDfuaS0egGfsDv4DDv000w3IWYidd");

document.getElementById("checkout-one-time").addEventListener("click", async () => {
  try {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId: "price_1SQZuMDnXcpIZEtBrexTYyYC" })
    });
    const session = await res.json();
    if(session.id) stripe.redirectToCheckout({ sessionId: session.id });
    else alert("Erro ao iniciar o pagamento.");
  } catch (err) {
    console.error(err);
    alert("Falha na comunicação com o servidor.");
  }
});

document.getElementById("checkout-subscription").addEventListener("click", async () => {
  try {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId: "price_1SQZvhDnXcpIZEtBqcIQq7XE" })
    });
    const session = await res.json();
    if(session.id) stripe.redirectToCheckout({ sessionId: session.id });
    else alert("Erro ao iniciar o pagamento.");
  } catch (err) {
    console.error(err);
    alert("Falha na comunicação com o servidor.");
  }
});
