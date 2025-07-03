"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    'users-permissions': {
        config: {
            register: {
                // Campos adicionales permitidos al registrar un usuario desde el frontend
                allowedFields: [
                    'telefono',
                    'rol',
                    'direccion',
                    'documentoID',
                    'fechaNacimiento',
                    'genero',
                    'nombre',
                    'apellido',
                ],
            },
        },
    },
});
