import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido" });

  try {
    const PRICE_ONETIME = "price_2wnuRjD2yUVCR4xUGFWEAsZd"; 
    const PRICE_SUBSCRIPTION = "price_2wnuUoD2yUVCR4xU1xXXz2vP";

    const type = req.body?.type || "payment";
    const priceId = type === "subscription" ? PRICE_SUBSCRIPTION : PRICE_ONETIME;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["pix", "link", "card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: type === "subscription" ? "subscription" : "payment",
      success_url: `${req.headers.origin}/premium.html?success=true`,
      cancel_url: `${req.headers.origin}/premium.html?canceled=true`,
    });

    return res.status(200).json({ payment_url: session.url });
  } catch (err) {
    console.error("Erro ao criar sessão de pagamento:", err);
    return res.status(500).json({ error: err.message });
  }
}
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido" });

  try {
    const PRICE_ONETIME = "price_2wnuRjD2yUVCR4xUGFWEAsZd"; 
    const PRICE_SUBSCRIPTION = "price_2wnuUoD2yUVCR4xU1xXXz2vP";

    const type = req.body?.type || "payment";
    const priceId = type === "subscription" ? PRICE_SUBSCRIPTION : PRICE_ONETIME;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["pix", "link", "card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: type === "subscription" ? "subscription" : "payment",
      success_url: `${req.headers.origin}/premium.html?success=true`,
      cancel_url: `${req.headers.origin}/premium.html?canceled=true`,
    });

    return res.status(200).json({ payment_url: session.url });
  } catch (err) {
    console.error("Erro ao criar sessão de pagamento:", err);
    return res.status(500).json({ error: err.message });
  }
}
