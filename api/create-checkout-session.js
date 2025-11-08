import Stripe from "stripe";

// (Opcional/temporário) Chave secreta diretamente no arquivo.
// Substitua por process.env.STRIPE_SECRET_KEY quando colocar em variáveis de ambiente.
const stripe = new Stripe("sk_test_51SQWCUD2yUVCR4xU4gcnopG0PEXzpfHEFG8kjmFRvJs7SLfdCxERtcJI9PNzVWQliCUe8KT4UcDsS1EFbmAeu2ZK00Evdr4G3B", {
  apiVersion: "2023-10-16",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { priceId } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: "priceId não fornecido" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "pix"], // card inclui Google/Apple Pay quando disponíveis
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${req.headers.origin}/premium.html?success=true`,
      cancel_url: `${req.headers.origin}/premium.html?canceled=true`,
      currency: "brl",
      locale: "pt-BR",
      payment_method_options: {
        pix: { expires_after_seconds: 1800 },
      },
    });

    return res.status(200).json({ id: session.id });
  } catch (err) {
    console.error("❌ Erro ao criar sessão:", err);
    return res.status(500).json({ error: err.message || "Erro ao criar sessão" });
  }
}
