"use strict";

// Custom validator for Strapi v5 users-permissions register route
// Located under plugins so it overrides the core validator.
// Allows our extra demographic fields.

module.exports = {
  schema: {
    body: {
      type: "object",
      required: ["username", "email", "password"],
      additionalProperties: true,
      properties: {
        username: { type: "string", minLength: 3 },
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 6 },
        telefono: { type: "string" },
        rol: { type: "string" },
        fechaNacimiento: { type: "string" },
        genero: { type: "string" },
        direccion: { type: "string" },
        documentoID: { type: "string" },
        nombre: { type: "string" },
        apellido: { type: "string" }
      }
    }
  }
};
