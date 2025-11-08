const stripe = Stripe("SUA_CHAVE_PUBLICA_DO_STRIPE");

document.getElementById("checkout-one-time").addEventListener("click", async () => {
  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "one-time" }),
  });
  const data = await res.json();
  stripe.redirectToCheckout({ sessionId: data.id });
});

document.getElementById("checkout-subscription").addEventListener("click", async () => {
  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "subscription" }),
  });
  const data = await res.json();
  stripe.redirectToCheckout({ sessionId: data.id });
});

document.getElementById("enviar").addEventListener("click", () => {
  const msg = document.getElementById("mensagem").value;
  const respostas = document.getElementById("respostas");
  respostas.innerHTML += `<p><b>Você:</b> ${msg}</p><p>IA responde: ${msg}</p>`;
  document.getElementById("mensagem").value = "";
});
