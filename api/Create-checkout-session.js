import Stripe from "stripe";

// Pega a chave secreta do Stripe do arquivo .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });

export default async function handler(req, res) {
  const { type } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: type === "subscription" ? "subscription" : "payment",
    line_items: [
      {
        price: type === "subscription" ? "PRICE_ID_ASSINATURA" : "PRICE_ID_UNICO",
        quantity: 1,
      },
    ],
    success_url: `${req.headers.origin}/premium.html`,
    cancel_url: `${req.headers.origin}/index.html`,
  });

  res.status(200).json({ id: session.id });
}
