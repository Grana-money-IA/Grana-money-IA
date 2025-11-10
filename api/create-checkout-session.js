
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51SQWCUD2yUVCR4xU4gcnopG0PEXzpfHEFG8kjmFRvJs7SLfdCxERtcJI9PNzVWQliCUe8KT4UcDsS1EFbmAeu2ZK00Evdr4G3B');

import Stripe from "stripe";

// Sua chave secreta do Stripe (backend)
const stripe = new Stripe(
  "sk_test_51SQWCUD2yUVCR4xU4gcnopG0PEXzpfHEFG8kjmFRvJs7SLfdCxERtcJI9PNzVWQliCUe8KT4UcDsS1EFbmAeu2ZK00Evdr4G3B",
  { apiVersion: "2023-10-16" }
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // IDs dos seus produtos/planos
    const PRICE_ONETIME = "price_2wnuRjD2yUVCR4xUGFWEAsZd"; // compra única
    const PRICE_SUBSCRIPTION = "price_2wnuUoD2yUVCR4xU1xXXz2vP"; // assinatura

    // Defina aqui se é assinatura ou pagamento único
    const type = req.body?.type || "payment"; // "payment" ou "subscription"
    const priceId = type === "subscription" ? PRICE_SUBSCRIPTION : PRICE_ONETIME;

    // Cria a sessão de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["pix", "link", "card"], // Pix, Link e cartão
      line_items: [{ price: priceId, quantity: 1 }],
      mode: type === "subscription" ? "subscription" : "payment",
      success_url: `${req.headers.origin}/premium.html?success=true`,
      cancel_url: `${req.headers.origin}/premium.html?canceled=true`,
    });

    // Retorna a URL do pagamento (Pix/Link)
    return res.status(200).json({ payment_url: session.url });
  } catch (err) {
    console.error("Erro ao criar sessão de pagamento:", err);
    return res.status(500).json({ error: err.message });
  }
}
