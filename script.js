
<script src="https://js.stripe.com/v3/"></script>
<script>
  const stripe = Stripe("pk_test_51SQWCUD2yUVCR4xU80UabulobqK1Qt0APEsGymb1J8nEa3ErAcem0qG3z65XnNHaF5BQrzDfuaS0egGfsDv4DDv000w3IWYidd"); // sua chave pública

  document.getElementById("checkout-one-time").addEventListener("click", async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId: "price_1SQZuMDnXcpIZEtBrexTYyYC" }) // substitua pelo seu priceId real
    });
    const session = await res.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  });

  document.getElementById("checkout-subscription").addEventListener("click", async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId: "price_1SQZvhDnXcpIZEtBqcIQq7XE" }) // substitua pelo ID do plano mensal
    });
    const session = await res.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  });
</script>
