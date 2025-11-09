require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(proces);Chave secreta sk_test_51SQWCUD2yUVCR4xU4gcnopG0PEXzpfHEFG8kjmFRvJs7SLfdCxERtcJI9PNzVWQliCUe8KT4UcDsS1EFbmAeu2ZK00Evdr4G3B

app.use(express.json());
app.use(express.static(__dirname));

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        { price: '{{}',price_1SQZuMDnXcpIZEtBrexTYyYC quantity: 1 }
      ],
      mode: 'payment',
      payment_method_types: ['card', 'link', 'pix', 'paypal'],
      success_url: 'https://seusite.com/sucesso.html',
      cancel_url: 'https://seusite.com/cancelado.html',
      shipping_address_collection: { allowed_countries: ['BR'] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 1000, currency: 'brl' },
            display_name: 'Frete R$10,00',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 }
            }
          }
        }
      ]
    });

    res.json({ client_secret: session.client_secret, session_id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// endpoints para atualizar endereço e frete
app.post('/update-session-shipping', async (req, res) => {
  try {
    const { sessionId } = req.body;
    await stripe.checkout.sessions.update(sessionId, {
      shipping_address_collection: { allowed_countries: ['BR'] }
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
});

app.post('/update-session-shipping-rate', async (req, res) => {
  try {
    const { sessionId, shippingRateId } = req.body;
    await stripe.checkout.sessions.update(sessionId, {
      shipping_options: [{ shipping_rate: shippingRateId }]
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
