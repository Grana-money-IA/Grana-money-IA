// CONTROLE DE ACESSO
const TEMPO_GRATIS = 3 * 60 * 60 * 1000; // 3 horas

let inicio = localStorage.getItem("inicio");

if (!inicio) {
  localStorage.setItem("inicio", Date.now());
} else {
  let tempoUsado = Date.now() - inicio;

  if (tempoUsado > TEMPO_GRATIS && !localStorage.getItem("vip")) {
    alert("Seu tempo grátis acabou! Compre o VIP.");
    window.location.href = "premium.html";
  }
}
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
