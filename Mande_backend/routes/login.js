var express = require('express');

var router = express.Router();

const connect = require('./db_pool_connect');


router.post('/', function (req, res, next) {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    if (req.body.tipo == "cliente") {
      const verificarCliente = async () => {
        let cliente = await client.query(`SELECT * FROM cliente WHERE email = '${req.body.email}' and numero_celular = '${req.body.numero_celular}';`)
        if (cliente.rows.length == 0) {
          res.status(401).json({ error: true, informacion: "el usuario no existe" });
        }
        else {
          res.status(200).json({ error: false, informacion: "se ha logueado exitosamente", usuario: cliente.rows[0]});
        }
      }
      verificarCliente().then();
    }
    else if (req.body.tipo == "trabajador") {
      const verificarTrabajador = async () => {
        let cliente = await client.query(`SELECT * FROM trabajador WHERE email = '${req.body.email}' and numero_celular = '${req.body.numero_celular}';`)
        if (cliente.rows.length == 0) {
          res.status(401).json({ error: true, informacion: "el usuario no existe" });
        }
        else {
          res.status(200).json({ error: false, informacion: "se ha logueado exitosamente", usuario: cliente.rows[0]});
        }
      }
      verificarTrabajador().then();
    }
    else {
      res.status(400).json({ error: true, informacion: "introduzca un tipo valido" });
    }
  });
})

module.exports = router;
