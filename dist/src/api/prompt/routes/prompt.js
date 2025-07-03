"use strict";
/**
 * prompt router
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = {
    routes: [
        {
            method: 'POST',
            path: '/prompts/:id/run',
            handler: 'prompt.run',
        }
    ],
    router: strapi_1.factories.createCoreRouter('api::prompt.prompt')
};
