export default {
  enabled: true,
  prefix: '/stripe',
  routes: {
    'create-payment-intent': {
      method: 'POST',
      handler: 'stripe.createPaymentIntent',
    },
    'create-checkout-session': {
      method: 'POST',
      handler: 'stripe.createCheckoutSession',
    },
    'confirm-payment': {
      method: 'POST',
      handler: 'stripe.confirmPayment',
    },
    'webhook': {
      method: 'POST',
      handler: 'stripe.webhook',
    },
  },
}; 