/**
 * prompt router
 */

import { factories } from '@strapi/strapi';

export default {
  routes: [
    {
      method: 'POST',
      path: '/prompts/:id/run',
      handler: 'prompt.run',
    }
  ],
  router: factories.createCoreRouter('api::prompt.prompt')
};
