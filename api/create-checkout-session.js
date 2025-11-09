import Stripe from "stripe";

const stripe = new Stripe("sk_test_51SQWCUD2yUVCR4xU4gcnopG0PEXzpfHEFG8kjmFRvJs7SLfdCxERtcJI9PNzVWQliCUe8KT4UcDsS1EFbmAeu2ZK00Evdr4G3B", {
  apiVersion: "2023-10-16",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { type } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: type === "subscription" ? "subscription" : "payment",
      line_items: [
        {
          price: type === "subscription" ? "price_2wnuUoD2yUVCR4xU1xXXz2vP" : "price_2wnuRjD2yUVCR4xUGFWEAsZd",
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/premium.html?success=true`,
      cancel_url: `${req.headers.origin}/premium.html?canceled=true`,
    });

    return res.status(200).json({ id: session.id });
  } catch (err) {
    console.error("❌ Erro ao criar sessão:", err);
    return res.status(500).json({ error: err.message });
  }
}
