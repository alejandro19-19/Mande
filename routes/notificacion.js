var express = require('express');
var router = express.Router();

const connect = require('./db_pool_connect');
router.post('/:id', function (req, res, next){
    connect(function (err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err);
      }
      const obtenerInfo = async () => {
        client.query(`SELECT tipo_servicio, descripcion_trabajo, nombre_cliente, apellidos_cliente, direccion_cliente 
        FROM notificacion_contratacion WHERE contratacion_id =${req.params.id};`,function(err,result){
            done(err);
            if (err) {
              return console.error('error running query', err);
            }
            res.status(302).json({error: false, informacion:result.rows});
            //res.send(JSON.stringify(result));
          });
      }
      obtenerInfo().then();
    });
})

module.exports = router;