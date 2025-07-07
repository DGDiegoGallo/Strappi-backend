import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_simulacion', {
  apiVersion: '2025-06-30.basil',
});

export default () => ({
  /**
   * Crear un Payment Intent
   */
  async createPaymentIntent(amount: number, currency: string = 'usd', metadata?: any) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe usa centavos
        currency,
        metadata: metadata || {},
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        success: true,
        data: {
          client_secret: paymentIntent.client_secret,
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: paymentIntent.status,
        },
      };
    } catch (error) {
      console.error('Error creating payment intent:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Confirmar un pago
   */
  async confirmPayment(paymentIntentId: string) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      return {
        success: true,
        data: {
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: paymentIntent.status,
          metadata: paymentIntent.metadata,
        },
      };
    } catch (error) {
      console.error('Error confirming payment:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Crear un Checkout Session
   */
  async createCheckoutSession(amount: number, currency: string = 'usd', metadata?: any) {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency,
              product_data: {
                name: 'Compra de USDT',
                description: `Compra de criptomoneda USDT por $${amount}`,
              },
              unit_amount: Math.round(amount * 100), // Stripe usa centavos
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/crypto-wallet?success=true`,
        cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/crypto-wallet?canceled=true`,
        metadata: metadata || {},
      });

      return {
        success: true,
        data: {
          id: session.id,
          url: session.url,
          payment_intent: session.payment_intent,
        },
      };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Validar webhook de Stripe
   */
  validateWebhook(payload: any, signature: string) {
    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test'
      );
      return { success: true, event };
    } catch (error) {
      console.error('Webhook validation error:', error);
      return { success: false, error: error.message };
    }
  },
}); 