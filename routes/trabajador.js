var express = require('express');
var bodyParser = require('body-parser')

var router = express.Router();

const connect = require('./db_pool_connect');

/**
 * Listar todos los trabajadores
 */
router.get('/', function (req, res, next) {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query('SELECT * FROM trabajador;', function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('error running query', err);
      }
      res.status(200).json({error: false, "result":result.rows});
    });
  });

})

/**
 * Buscar un trabajador dado su id
 */
router.get('/:id', function (req, res, next) {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`SELECT * FROM trabajador WHERE id=${req.params.id};`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('error running query', err);
      }
      res.status(200).json({error: false, "result":result.rows});
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
  
    //use the client for executing the query
    //usuario = client.query(`select nombre from cliente where nombre =  '${req.body.nombre_usuario}';`)
    //console.log(usuario)

    const crearTrabajador = async () => {
      emailUsuario = await client.query(`select email from trabajador where email =  '${req.body.email}';`)
      if (emailUsuario.rows.length == 0){
        client.query(`INSERT INTO  trabajador(nombre,apellidos,email,numero_celular,fecha_nacimiento,direccion_residencia,documento_identidad,foto_perfil) VALUES ('${req.body.nombre}','${req.body.apellidos}','${req.body.email}', '${req.body.numero_celular}','${req.body.fecha_nacimiento}','${req.body.direccion_residencia}','${req.body.documento_identidad}','${req.body.foto_perfil}');`, function (err, result) {
          //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
          done(err);
          if (err) {
            return console.error('error running query', err);
          }
          res.status(201).json({error: false,informacion: "el trabajador se ha creado exitosamente"});
        });
      }
      else {
        res.status(400).json({error: true,informacion: "el usuario ya existe, escoja otro por favor"});
      }
    }
    crearTrabajador().then();
  });
})

module.exports = router;