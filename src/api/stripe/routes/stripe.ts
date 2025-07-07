export default {
  routes: [
    {
      method: 'POST',
      path: '/stripe/create-payment-intent',
      handler: 'stripe.createPaymentIntent',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/stripe/create-checkout-session',
      handler: 'stripe.createCheckoutSession',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/stripe/confirm-payment',
      handler: 'stripe.confirmPayment',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/stripe/webhook',
      handler: 'stripe.webhook',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
}; 