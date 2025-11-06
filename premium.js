// Stripe public key (você vai criar na sua conta Stripe)
const stripe = Stripe("SUA_CHAVE_PUBLICA_DO_STRIPE");

const checkoutButton = document.getElementById("checkout-button");

checkoutButton.addEventListener("click", () => {
  fetch("/create-checkout-session", { method: "POST" })
    .then(res => res.json())
    .then(session => {
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(result => {
      if (result.error) alert(result.error.message);
    })
    .catch(err => console.error(err));
});
