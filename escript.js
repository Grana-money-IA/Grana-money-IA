// CONTROLE DE ACESSO
const TEMPO_GRATIS = 3 * 60 * 60 * 1000; // 3 horas

let inicio = localStorage.getItem("inicio");

if (!inicio) {
  localStorage.setItem("inicio", Date.now());
} else {
  let tempoUsado = Date.now() - parseInt(inicio);

  if (tempoUsado > TEMPO_GRATIS && !localStorage.getItem("vip")) {
    alert("Seu tempo grátis acabou! Compre o VIP.");
    window.location.href = "premium.html";
  }
}

// BOTÃO DE PAGAMENTO (SEGURANÇA PRA NÃO DAR ERRO)
const btn = document.getElementById("checkout-one-time");

if (btn) {
  btn.addEventListener("click", async () => {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // vai pro Stripe
      } else {
        alert("Erro ao criar sessão de pagamento.");
      }

    } catch (err) {
      alert("Erro ao iniciar o pagamento: " + err.message);
    }
  });
}
