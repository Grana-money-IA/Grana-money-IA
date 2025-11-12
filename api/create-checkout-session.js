
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: "prod_TNKZ76el7fsMPu", // 🔹 seu ID de produto do Stripe
          quantity: 1,
        },
      ],
      success_url: "https://grana-money-ia.vercel.app/sucesso.html",
      cancel_url: "https://grana-money-ia.vercel.app/",
    });

    res.status(200).json({ payment_url: session.url });
  } catch (error) {
    console.error("Erro Stripe:", error);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
}
