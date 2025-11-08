const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const { priceId } = req.body;

    // Detecta se é assinatura ou pagamento único
    const isSubscription = priceId && priceId.startsWith("price_") && priceId.includes("sub");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: isSubscription ? "subscription" : "payment",
      success_url: `${req.headers.origin}/sucesso.html`,
      cancel_url: `${req.headers.origin}/cancelado.html`,
    });

    return res.status(200).json({ id: session.id });
  } catch (err) {
    console.error("Erro ao criar sessão de checkout:", err);
    return res.status(500).json({ error: "Erro ao criar sessão" });
  }
};
