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
        // Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51SQWCUD2yUVCR4xU4gcnopG0PEXzpfHEFG8kjmFRvJs7SLfdCxERtcJI9PNzVWQliCUe8KT4UcDsS1EFbmAeu2ZK00Evdr4G3B');

const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  line_items: [
    {
      price: '{{PRICE_ID}}',
      quantity: 2,
    },
  ],
  success_url: 'https://example.com/success',
  payment_method_types: ['bancontact', 'card', 'eps', 'ideal', 'p24', 'sepa_debit'],
});
