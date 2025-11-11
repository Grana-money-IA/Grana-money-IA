
// /api/checkout.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { type } = req.body;

    // ✅ ID do produto que você criou no Stripe
    const PRODUCT_ID = "prod_TNKZ76el7fsMPu";

    // Cria o checkout
    const session = await stripe.checkout.sessions.create({
      mode: type === "subscription" ? "subscription" : "payment",
      line_items: [
        {
          price_data: {
            currency: "brl",
            product: PRODUCT_ID,
            unit_amount: type === "subscription" ? undefined : 4990, // Opcional
            recurring: type === "subscription" ? { interval: "month" } : undefined,
          },
          quantity: 1,
        },
      ],
      success_url: "https://grana-money-ia.vercel.app/sucesso",
      cancel_url: "https://grana-money-ia.vercel.app/",
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Erro ao criar checkout:", error);
    return res.status(500).json({ error: error.message });
  }
}
