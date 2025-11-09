document.getElementById("checkout-one-time").addEventListener("click", async () => {
  const response = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "payment" }),
  });
  const session = await response.json();
  window.location.href = `https://checkout.stripe.com/pay/${session.id}`;
});

document.getElementById("checkout-subscription").addEventListener("click", async () => {
  const response = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "subscription" }),
  });
  const session = await response.json();
  window.location.href = `https://checkout.stripe.com/pay/${session.id}`;
});
const stripe = Stripe("pk_test_51SQWCUD2yUVCR4xU80UabulobqK1Qt0APEsGymb1J8nEa3ErAcem0qG3z65XnNHaF5BQrzDfuaS0egGfsDv4DDv000w3IWYidd");
const PRICE_ID = "price_1SQZuMDnXcpIZEtBrexTYyYC";

document.getElementById("checkout-one-time").addEventListener("click", async () => {
  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId: PRICE_ID }),
  });

  const data = await res.json();
  if (data.url) {
    window.location.href = data.url;
  } else {
    alert("Erro ao iniciar checkout");
  }
});
