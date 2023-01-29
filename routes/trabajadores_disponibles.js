var express = require('express');
var router = express.Router();

const connect = require('./db_pool_connect');

/**
 * Listar todos los trabajadores disponibles ordenados por calificacion, distancia y precio
 */
router.get('/', function (req, res, next) {
    connect(function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
  
        //use the client for executing the query
        client.query(`SELECT nombre,apellidos,email,direccion_residencia,foto_perfil,id_trabajador,id_servicio,calificacion,valor_fraccion FROM trabajadores_disponibles where id_servicio = '${req.body.id_servicio}';`, function (err, result) {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);

        if (err) {
            return console.error('error running query', err);
        }
        res.status(200).json({error: false, "result":result.rows});
        });
    });
})

module.exports = router;