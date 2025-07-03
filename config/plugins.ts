export default () => ({
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
