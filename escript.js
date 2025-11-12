
document.getElementById("checkout-one-time").addEventListener("click", async () => {
  try {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url; // redireciona pro Stripe Checkout
    } else {
      alert("Erro ao criar sessão de pagamento.");
    }
  } catch (err) {
    alert("Erro ao iniciar o pagamento: " + err.message);
  }
});
