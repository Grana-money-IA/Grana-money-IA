import Stripe from "stripe";

// Chave secreta do Stripe (backend)
const stripe = new Stripe("sk_test_51SQWCUD2yUVCR4xU80UabulobqK1Qt0APEsGymb1J8nEa3ErAcem0qG3z65XnNHaF5BQrzDfuaS0egGfsDv4DDv000w3IWYidd", {
  apiVersion: "2023-10-16",
});

export default async function handler(req, res) {
  if(req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { priceId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "pix"], // Pix + cartão
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${req.headers.origin}/premium.html?success=true`,
      cancel_url: `${req.headers.origin}/premium.html?canceled=true`,
      currency: "brl",
      locale: "pt-BR",
    });

    return res.status(200).json({ id: session.id });
  } catch (err) {
    console.error("❌ Erro ao criar sessão:", err);
    return res.status(500).json({ error: "Erro ao criar sessão" });
  }
}
