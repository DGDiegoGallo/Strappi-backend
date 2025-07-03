/**
 * prompt controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::prompt.prompt', ({ strapi }) => ({
  async run(ctx) {
    const { id } = ctx.params;
    if (!id) return ctx.badRequest('id param missing');

    const entity = await strapi.entityService.findOne('api::prompt.prompt', id, { populate: '*' as any });
    // Si el cliente envía campos en el body, sobre-escribe los del registro
    const payload = { ...entity, ...ctx.request.body };
    if (!entity) return ctx.notFound('Prompt not found');

    try {
      const answer = await strapi.service('api::prompt.chutes').chat(payload);
      ctx.body = { answer };
    } catch (e) {
      strapi.log.error('Chutes.ai error', JSON.stringify(e.response?.data || e, null, 2));
      ctx.internalServerError('Failed to execute prompt');
    }
  },
}));
