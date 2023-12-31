const db = require('../../database/models');
const Usuarios = db.Usuario;

module.exports = {
    'detail': async (req, res) => {
        try {
            let idUser = req.params.id;
            let usuario = await Usuarios.findByPk(idUser);

            if (!usuario) {
                // Si no se encuentra el usuario, lanzamos un error.
                throw new Error('El usuario no existe');
            }

            let imgUrl = `${req.protocol}://${req.hostname}:3001/images/users/${usuario.img_usuario}`;

            const { clave, id_rol, ...detail } = usuario.toJSON();
            detail.img_usuario = imgUrl;

            let dataUser = {
                meta: {
                    status: 200,
                    url: `${req.protocol}://${req.hostname}:3001${req.url}`
                },
                detail
            };

            res.json(dataUser);
        } catch (error) {
            console.error('Error en la consulta:', error.message);
            res.status(404).send('El usuario no existe');
        }
    }
};
