const bcryptjs = require('bcryptjs');
const express = require('express');
const _ = require('underscore');
const app = express();
const Usuario = require('../models/usuario');

/*rutas*/
app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    let condicion = { estado: true };

    Usuario.find(condicion, 'nombre email role estado google img') // el primer argumento busca se puede filtrar, el segundo son los campos que muestra
        .skip(desde) // skip inica el inicio desde donde va a mostrar ejemplo desde el 0 o desde el 5
        .limit(limite) //hasta donde va a mostrar, limite
        .exec((err, usuarios) => { //ejecuta ese call back despues de la busqueda
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count(condicion, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            });
        });

});

app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcryptjs.hashSync(body.password, 10),
        role: body.role,
        estado: body.estado
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let cambiaestado = {
        estado: false
    }

    console.log(id);

    // Usuario.findOneAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiaestado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });


});

module.exports = app;