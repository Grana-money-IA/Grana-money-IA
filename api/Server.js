
require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(express.static(__dirname));

// ROTA DO CHECKOUT
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',

      line_items: [
        {
          price: process.env.PRICE_ID,
          quantity: 1,
        },
      ],

      success_url: 'https://seusite.com/sucesso.html',
      cancel_url: 'https://seusite.com/cancelado.html',

      shipping_address_collection: {
        allowed_countries: ['BR'],
      },

      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1000, // R$10,00
              currency: 'brl',
            },
            display_name: 'Frete padrão',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ],
    });

    res.json({ url: session.url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar sessão de pagamento' });
  }
});

// SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
