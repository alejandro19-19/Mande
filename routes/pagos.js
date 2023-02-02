var express = require('express');
var router = express.Router();
var crypto = require('crypto');
const connect = require('./db_pool_connect');

router.post('/', function (req, res, next) {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    numero = req.body.numero_tarjeta;
    hash_numero = crypto.createHash("sha256").update(numero).digest('hex');
    const registrar_pagos = async () => {
      id_tarjeta = await client.query(`SELECT id FROM tarjeta WHERE numero = '${hash_numero}' AND id_cliente = '${req.body.id_cliente}';`)
      if (id_tarjeta.rows.length == 0) {
        res.status(404).json({ error: true, informacion: "El numero de tarjeta ingresado no esta registrado como metodo de pago de este cliente" });
      } 
      else {
        client.query(`INSERT INTO pago (id_cliente,numero_tarjeta,id_tarjeta,id_trabajador,valor_pago) VALUES
        ('${req.body.id_cliente}', '${hash_numero}', '${id_tarjeta.rows[0].id}','${req.body.id_trabajador}','${req.body.valor_pago}')`, function (err, result) {
          done(err);
          if (err) {
            return console.error('error running query', err);
          }
          res.status(201).json({ error: false, informacion: "el pago ha sido registrado correctamente" });
        });
      }
    }
    registrar_pagos().then()
  });
})

module.exports = router;