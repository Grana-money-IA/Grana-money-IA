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
      payment_method_types: ["card", "boleto", "pix"], // 💳 cartão, boleto e PIX
      line_items: [
        {
          price: "price_1SQZuMDnXcpIZEtBrexTYyYC", // 🏷️ seu preço do Stripe
          quantity: 1,
        },
      ],
      success_url: "https://grana-money-ia.vercel.app/sucesso.html",
      cancel_url: "https://grana-money-ia.vercel.app/erro.html",
      locale: "pt-BR",
      payment_method_options: {
        boleto: {
          expires_after_days: 3, // boleto válido por 3 dias
        },
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Erro ao criar sessão:", error);
    res.status(500).json({ error: error.message });
  }
}
