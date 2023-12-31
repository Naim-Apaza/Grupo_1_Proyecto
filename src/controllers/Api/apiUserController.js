const db = require("../../database/models");
const Usuarios = db.Usuario;

module.exports = {
  detail: async (req, res) => {
    try {
      let idUser = req.params.id;
      let usuario = await Usuarios.findByPk(idUser);

      if (!usuario) {
        // Si no se encuentra el usuario, lanzamos un error.
        throw new Error("El usuario no existe");
      }

      let imgUrl = `${req.protocol}://${req.get("host")}/images/users/${
        usuario.img_usuario
      }`;

      const { clave, id_rol, ...detail } = usuario.toJSON();
      detail.img_usuario = imgUrl;

      let dataUser = {
        meta: {
          status: 200,
          url: `${req.protocol}://${req.get("host")}${req.url}`,
        },
        detail,
      };

      res.status(200).json(dataUser);
    } catch (error) {
      console.error("Error en la consulta:", error.message);
      res.status(404).send("El usuario no existe");
    }
  },
  listado: async (req, res) => {
    try {
      let usuarios = await Usuarios.findAll();
      let count = usuarios.length;
      let data = {
        meta: {
          status: 200,
          url: `${req.protocol}://${req.get("host")}${req.url}`,
          count,
        },
        users: usuarios.map((usuario) => {
          return {
            id: usuario.id_usuario,
            name: usuario.nombre,
            email: usuario.correo,
            detail: `${req.protocol}://${req.get("host")}/api/users/${
              usuario.id_usuario
            }`,
          };
        }),
      };
      res.status(200).json(data);
    } catch (error) {
      console.error("Error en la consulta:", error.message);
      res.status(404).send("Error al obtener la lista de usuarios");
    }
  },
};
