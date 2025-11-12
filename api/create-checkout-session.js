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
      payment_method_types: ["card", "boleto", "pix"], // PIX incluso
      line_items: [
        {
          price: "price_1SQZuMDnXcpIZEtBrexTYyYC",
          quantity: 1,
        },
      ],
      currency: "brl", // força BRL
      success_url: "https://grana-money-ia.vercel.app/sucesso.html",
      cancel_url: "https://grana-money-ia.vercel.app/erro.html",
      locale: "pt-BR",
      payment_method_options: {
        boleto: { expires_after_days: 3 },
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Erro ao criar sessão:", error);
    res.status(500).json({ error: error.message });
  }
}
