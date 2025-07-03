"use strict";
/**
 * prompt controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::prompt.prompt', ({ strapi }) => ({
    async run(ctx) {
        var _a;
        const { id } = ctx.params;
        if (!id)
            return ctx.badRequest('id param missing');
        const entity = await strapi.entityService.findOne('api::prompt.prompt', id, { populate: '*' });
        // Si el cliente envía campos en el body, sobre-escribe los del registro
        const payload = { ...entity, ...ctx.request.body };
        if (!entity)
            return ctx.notFound('Prompt not found');
        try {
            const answer = await strapi.service('api::prompt.chutes').chat(payload);
            ctx.body = { answer };
        }
        catch (e) {
            strapi.log.error('Chutes.ai error', JSON.stringify(((_a = e.response) === null || _a === void 0 ? void 0 : _a.data) || e, null, 2));
            ctx.internalServerError('Failed to execute prompt');
        }
    },
}));
