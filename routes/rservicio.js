var express = require('express');
var router = express.Router();

const connect = require('./db_pool_connect');

router.post('/', function (req, res, next){
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    const registrarServicio = async () => {
      comprobacion = await client.query(`SELECT * FROM prestar_servicio WHERE id_servicio = '${req.body.id_servicio}' AND id_trabajador = '${req.body.id_trabajador}' ;`)
      if (comprobacion.rows.length == 0){
        client.query(`INSERT INTO prestar_servicio (id_trabajador, id_servicio, calificacion, valor_fraccion) VALUES ('${req.body.id_trabajador}','${req.body.id_servicio}','${req.body.calificacion}','${req.body.valor_fraccion}');`, function(err,result){
          done(err);
          if (err) {
            return console.error('error running query', err);
          }
          res.status(201).json({error: false,informacion: "el servicio se ha sido registrado exitosamente para el usuario trabajador"});
          //res.send(JSON.stringify(result));
        });
      }else{
        res.status(400).json({error: true,informacion: "el usuario trabajador ya tiene registrado este servicio"});
      }
    }
    registrarServicio().then();
  });
})

/* PARA DESVINCULAR UN SERVICIO PARA UN TRABAJADOR TODAVIA EN DUDA DE SI HACERLO ASI (PUEDE MODIFICARSE) */
router.delete('/',function (req, res, next){
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    const quitarServicio = async () => {
      comprobacion = await client.query(`SELECT * FROM prestar_servicio WHERE id_servicio = '${req.body.id_servicio}' AND id_trabajador = '${req.body.id_trabajador}' ;`)
      if (comprobacion.rows.length >= 1){
        client.query(`DELETE FROM prestar_servicio WHERE id_trabajador = '${req.body.id_trabajador}' AND id_servicio = '${req.body.id_servicio}';`, function(err,result){
          done(err);
          if (err) {
            return console.error('error running query', err);
          }
          res.status(201).json({error: false,informacion: "el servicio se ha sido removido exitosamente para el usuario trabajador"});
          //res.send(JSON.stringify(result));
        });
      }else{
        res.status(400).json({error: true,informacion: "el usuario trabajador no tiene este servicio registrado"});
      }
    }
    quitarServicio().then();
  });
})

module.exports = router;