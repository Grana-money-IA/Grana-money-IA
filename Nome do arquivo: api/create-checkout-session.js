// api/create-checkout-session.js
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  try {
    const { priceId } = req.body;
    const isSubscription = priceId && priceId.includes("rec"); // verifica se é assinatura

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: isSubscription ? "subscription" : "payment",
      success_url: `${req.headers.origin}/sucesso`,
      cancel_url: `${req.headers.origin}/cancelado`,
    });

    return res.status(200).json({ id: session.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao criar sessão" });
  }
};
