var express = require('express');
var bodyParser = require('body-parser')

var router = express.Router();

const connect = require('./db_pool_connect');

var fs = require('fs');


/**
 * Obtener un trabajador dado su correo
 */
router.post('/obtener', function (req, res, next) {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`SELECT * FROM trabajador WHERE email='${req.body.email}';`, function (err, result) {
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

    //use the client for executing the query
    //usuario = client.query(`select nombre from cliente where nombre =  '${req.body.nombre_usuario}';`)
    //console.log(usuario)

    const crearTrabajador = async () => {
      emailUsuario = await client.query(`SELECT email FROM trabajador WHERE email =  '${req.body.email}';`)

      if (emailUsuario.rows.length == 0) {
        auxiliar_foto = req.body.foto_perfil //este auxiliar permite eliminar la cabecera
        auxiliar1_foto = auxiliar_foto.split(',');           //la cual indica que es un dato en base 64
        auxiliar2_foto = auxiliar1_foto.pop()
        auxiliar_documento = req.body.documento_identidad //este auxiliar permite eliminar la cabecera
        auxiliar1_documento = auxiliar_documento.split(',');           //la cual indica que es un dato en base 64
        auxiliar2_documento = auxiliar1_documento.pop();
        nombre_completo = req.body.nombre + "-" + req.body.apellidos;
        url_foto = `./storage/foto_perfil/foto_${nombre_completo}.png`;
        url_documento = `./storage/documento_identidad/${nombre_completo}.png`;
        buffer_foto = new Buffer.from(auxiliar2_foto, 'base64');
        buffer_documento = new Buffer.from(auxiliar2_documento, 'base64');
        fs.writeFileSync(url_foto, buffer_foto);
        fs.writeFileSync(url_documento, buffer_documento);

        client.query(`INSERT INTO  trabajador(nombre,apellidos,email,numero_celular,fecha_nacimiento,direccion_residencia,direccion_latitud,direccion_longitud,documento_identidad,foto_perfil) VALUES ('${req.body.nombre}','${req.body.apellidos}','${req.body.email}', '${req.body.numero_celular}','${req.body.fecha_nacimiento}','${req.body.direccion_residencia}','${req.body.direccion_latitud}','${req.body.direccion_longitud}','${url_documento}','${url_foto}');`, function (err, result) {
          //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
          done(err);
          if (err) {
            return console.error('error running query', err);
          }
          res.status(201).json({ error: false, informacion: "el trabajador se ha creado exitosamente" });
        });
      }
      else {
        res.status(400).json({ error: true, informacion: "el usuario ya existe, escoja otro por favor" });
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
      res.status(200).json({ error: false, "informacion": "el estado del trabajador se ha actualizado exitosamente" });
    });
  });
})

module.exports = router;