/*

SE DEBE CONSIDERAR SU ELIMINACION

var express = require('express');

var router = express.Router();

const connect = require('./db_pool_connect');

router.get('/', function (req, res, next) {
    connect(function (err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err);
      }

       //use the client for executing the query
        client.query(`SELECT AVG(calificacion_servicio) FROM contratacion where id_trabajador = '${req.body.id_trabajador}' and id_servicio = '${req.body.id_servicio}';`, function (err, result) {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);
  
        if (err) {
          return console.error('error running query', err);
        }
        res.status(200).json({error: false, "promedio":result.rows[0]});
        });  
    });
})

router.post('/', function (req, res, next) {
    connect(function (err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err);
      }

       //use the client for executing the query
        client.query(`UPDATE prestar_servicio SET calificacion = '${req.body.calificacion}' WHERE id_trabajador ='${req.body.id_trabajador}' and id_servicio ='${req.body.id_servicio}';`, function (err, result) {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);
  
        if (err) {
          return console.error('error running query', err);
        }
        res.status(200).json({error: false, "informacion":"la calificacion del trabajador se ha actualizado exitosamente"});
        });  
    });
})

module.exports = router;
*/
