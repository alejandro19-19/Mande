var express = require('express');
var router = express.Router();

const connect = require('./db_pool_connect');

router.post('/', function (req, res, next){
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    const crearContratacion= async () => {
      if (req.body.descripcion_trabajo.length == 0){
        client.query(`INSERT INTO contratacion (id_cliente, id_trabajador, id_servicio) VALUES 
        ('${req.body.id_cliente}','${req.body.id_trabajador}','${req.body.id_servicio}')`, function(err,result){
          done(err);
          if (err) {
            return console.error('error running query', err);
          }
          res.status(201).json({error: false, informacion: "la contratacion se ha registrado exitosamente"});
        });
      } else{
        client.query(`INSERT INTO contratacion (id_cliente, id_trabajador, id_servicio, descripcion_trabajo) VALUES 
        ('${req.body.id_cliente}','${req.body.id_trabajador}','${req.body.id_servicio}','${req.body.descripcion_trabajo}')`, function(err,result){
          done(err);
          if (err) {
            return console.error('error running query', err);
          }
          res.status(201).json({error: false, informacion: "la contratacion se ha registrado exitosamente"});
        });
      }
    }
    crearContratacion().then();
  });
})

router.get('/', function (req, res, next) {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    const devolverinfo = async () => {
      client.query(`SELECT * FROM contratacion WHERE id_cliente = ${req.body.id_cliente} 
        AND id_trabajador = ${req.body.id_trabajador} AND id_servicio = ${req.body.id_servicio} ORDER BY id DESC`, 
        function(err,result){
          done(err);
          if (err) {
            return console.error('error running query', err);
          }
          console.log(result.rows[0])
          res.status(200).json({error: false, contratacion: result.rows[0]});
          //res.send(JSON.stringify(result));
        });
    }
    devolverinfo().then()
  });
})

router.post('/:id', function (req, res, next) {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    const calificar = async () => {
      client.query(`UPDATE contratacion SET calificacion_servicio = ${req.body.calificacion} WHERE id =${req.params.id};`,
      function(err,result){
        done(err);
        if (err) {
          return console.error('error running query', err);
        }
        res.status(200).json({error: false, informacion:'la calificacion a sido registrada'});
        //res.send(JSON.stringify(result));
      });
    }
    calificar().then()
  });
})

module.exports = router;