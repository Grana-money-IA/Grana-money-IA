
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51SQWCUD2yUVCR4xU4gcnopG0PEXzpfHEFG8kjmFRvJs7SLfdCxERtcJI9PNzVWQliCUe8KT4UcDsS1EFbmAeu2ZK00Evdr4G3B');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          { price: 'prod_TNKZ76el7fsMPu: 1 } 
        ],
        mode: 'payment',
        payment_method_types: ['pix', 'link'], // Pix + Link
        success_url: 'https://seusite.com/sucesso.html',
        cancel_url: 'https://seusite.com/cancelado.html',
      });

      res.status(200).json({
        client_secret: session.client_secret,
        session_id: session.id,
        payment_url: session.url // Link direto do pagamento
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Método não permitido');
  }
}
