export default {
  /**
   * Crear Payment Intent
   */
  async createPaymentIntent(ctx) {
    try {
      const { amount, currency = 'usd', metadata } = ctx.request.body;
      
      if (!amount || amount <= 0) {
        return ctx.badRequest('El monto es requerido y debe ser mayor a 0');
      }

      const result = await strapi.service('api::stripe.stripe').createPaymentIntent(
        amount,
        currency,
        metadata
      );

      if (result.success) {
        return ctx.send({
          success: true,
          data: result.data,
        });
      } else {
        return ctx.badRequest(result.error);
      }
    } catch (error) {
      console.error('Error in createPaymentIntent:', error);
      return ctx.internalServerError('Error interno del servidor');
    }
  },

  /**
   * Crear Checkout Session
   */
  async createCheckoutSession(ctx) {
    try {
      const { amount, currency = 'usd', metadata } = ctx.request.body;
      
      if (!amount || amount <= 0) {
        return ctx.badRequest('El monto es requerido y debe ser mayor a 0');
      }

      const result = await strapi.service('api::stripe.stripe').createCheckoutSession(
        amount,
        currency,
        metadata
      );

      if (result.success) {
        return ctx.send({
          success: true,
          data: result.data,
        });
      } else {
        return ctx.badRequest(result.error);
      }
    } catch (error) {
      console.error('Error in createCheckoutSession:', error);
      return ctx.internalServerError('Error interno del servidor');
    }
  },

  /**
   * Confirmar pago
   */
  async confirmPayment(ctx) {
    try {
      const { paymentIntentId } = ctx.request.body;
      
      if (!paymentIntentId) {
        return ctx.badRequest('El ID del Payment Intent es requerido');
      }

      const result = await strapi.service('api::stripe.stripe').confirmPayment(paymentIntentId);

      if (result.success) {
        // Aquí puedes agregar lógica adicional como actualizar el wallet del usuario
        const { data } = result;
        
        // Ejemplo: actualizar el wallet del usuario
        if (data.status === 'succeeded') {
          // Aquí llamarías a tu servicio de user-wallet para actualizar el balance
          console.log('Pago confirmado:', data);
        }

        return ctx.send({
          success: true,
          data: result.data,
        });
      } else {
        return ctx.badRequest(result.error);
      }
    } catch (error) {
      console.error('Error in confirmPayment:', error);
      return ctx.internalServerError('Error interno del servidor');
    }
  },

  /**
   * Webhook de Stripe
   */
  async webhook(ctx) {
    try {
      const signature = ctx.request.headers['stripe-signature'];
      const payload = ctx.request.body;

      const validation = strapi.service('api::stripe.stripe').validateWebhook(
        payload,
        signature
      );

      if (!validation.success) {
        return ctx.badRequest('Signature inválida');
      }

      const event = validation.event;

      // Manejar diferentes tipos de eventos
      switch (event.type) {
        case 'payment_intent.succeeded':
          console.log('Payment succeeded:', event.data.object);
          // Aquí puedes agregar lógica para actualizar el wallet del usuario
          break;
        case 'payment_intent.payment_failed':
          console.log('Payment failed:', event.data.object);
          break;
        case 'checkout.session.completed':
          console.log('Checkout session completed:', event.data.object);
          break;
        default:
          console.log('Unhandled event type:', event.type);
      }

      return ctx.send({ received: true });
    } catch (error) {
      console.error('Error in webhook:', error);
      return ctx.internalServerError('Error interno del servidor');
    }
  },
}; 