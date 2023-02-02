var express = require('express');
var bodyParser = require('body-parser')

var router = express.Router();

const connect = require('./db_pool_connect');

var fs = require('fs');

/**
 * Obtener un cliente dado su correo
 */
router.post('/obtener', function (req, res, next) {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`SELECT * FROM cliente WHERE email='${req.body.email}';`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('error running query', err);
      }
      res.status(200).json({ error: false, "result": result.rows });
    });
  });
})

/**
 * Crear un usuario dados su nombre de usuario y password. 
 * !Antes de crearlo debería verificar si ya existe.
 */

router.post('/', function (req, res, next) {

  connect(function (err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }

    const crearCliente = async () => {
      emailUsuario = await client.query(`SELECT email FROM cliente WHERE email =  '${req.body.email}';`)
      if (emailUsuario.rows.length == 0) {

        auxiliar = req.body.recibo_servicio_publico //este auxiliar permite eliminar la cabecera
        auxiliar1 = auxiliar.split(',');           //la cual indica que es un dato en base 64
        auxiliar2 = auxiliar1.pop()
        buff = new Buffer.from(auxiliar2, 'base64');
        nombre_completo = req.body.nombre + "-" + req.body.apellidos;
        url = `./storage/recibo_servicio_publico/recibo_${nombre_completo}.png`;
        fs.writeFileSync(url, buff);

        client.query(`INSERT INTO  cliente(nombre,apellidos,email,numero_celular,fecha_nacimiento,direccion_residencia,direccion_latitud,direccion_longitud,recibo_servicio_publico) VALUES ('${req.body.nombre}','${req.body.apellidos}','${req.body.email}', '${req.body.numero_celular}','${req.body.fecha_nacimiento}','${req.body.direccion_residencia}','${req.body.direccion_latitud}','${req.body.direccion_longitud}','${url}');`, function (err, result) {
          //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
          done(err);
          if (err) {
            return console.error('error running query', err);
          }
          res.status(201).json({ error: false, informacion: "el cliente se ha creado exitosamente" });
        });
      }
      else {
        res.status(400).json({ error: true, informacion: "el usuario ya existe, escoja otro por favor" });
      }
    }
    crearCliente().then();
  });
})

module.exports = router;