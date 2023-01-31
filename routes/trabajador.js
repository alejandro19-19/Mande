var express = require('express');
var bodyParser = require('body-parser')

var upload = require('./storage')

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
router.post('/',upload.fields([{ name: 'foto_perfil', maxCount: 1 }, { name: 'documento_identidad', maxCount: 1 }]) ,function (req, res, next) {
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
        console.log("prueba",req.files["foto_perfil"])
        path_foto_perfil= req.files["foto_perfil"][0].path
        path_documento_identidad= req.files["documento_identidad"][0].path
        //new_path_foto_perfil = path_foto_perfil.replace("\","/");
        
        client.query(`INSERT INTO  trabajador(nombre,apellidos,email,numero_celular,fecha_nacimiento,direccion_residencia,direccion_latitud,direccion_longitud,documento_identidad,foto_perfil) VALUES ('${req.body.nombre}','${req.body.apellidos}','${req.body.email}', '${req.body.numero_celular}','${req.body.fecha_nacimiento}','${req.body.direccion_residencia}','${req.body.direccion_latitud}','${req.body.direccion_longitud}','${path_documento_identidad}','${path_foto_perfil}');`, function (err, result) {
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

router.put('/', function (req, res, next) {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`UPDATE trabajador SET disponible ='${req.body.disponible}' WHERE id ='${req.body.id_trabajador}';`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('error running query', err);
      }
      res.status(200).json({error: false, "informacion":"el estado del trabajador se ha actualizado exitosamente"});
    });
  });
})

module.exports = router;
