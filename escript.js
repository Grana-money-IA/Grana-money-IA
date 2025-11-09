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
