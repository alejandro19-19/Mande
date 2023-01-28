var express = require('express');
var router = express.Router();
var crypto = require('crypto');

const connect = require('./db_pool_connect');


/**
 * Buscar un trabajador dado su id
 */
router.post('/', function (req, res, next) {
    connect(function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        const registrarTarjeta = async () => {
            usuario = await client.query(`SELECT * FROM cliente WHERE id = '${req.body.id_cliente}';`)

            if (usuario.rows.length == 0){
                res.status(404).json({error: true,informacion: "el usuario no existe"});
            }
            else{
                numero = req.body.numero;
                hash_numero = crypto.createHash("sha256").update(numero).digest('hex');
                
                medio_pago = await client.query(`SELECT * FROM tarjeta WHERE numero= '${hash_numero}' and id_cliente = '${req.body.id_cliente}' and tipo = '${req.body.tipo}';`)
                if (medio_pago.rows.length == 0){
                    //encriptando la informacion crucial
                    //use the client for executing the query
                    cvv = req.body.cvv
                    hash_cvv = crypto.createHash("sha256").update(cvv).digest('hex');
                    client.query(`INSERT INTO tarjeta(numero, id_cliente, tipo, cvv,nombre_titular,fecha_vencimiento) VALUES ('${hash_numero}','${req.body.id_cliente}','${req.body.tipo}','${hash_cvv}','${req.body.nombre_titular}','${req.body.fecha_vencimiento}');`, function (err, result) {
                    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
                    done(err);
        
                    if (err) {
                        return console.error('error running query', err);
                    }
                    res.status(201).json({error: false, informacion: "el medio de pago se ha registrado exitosamente"});
                    });
                }
                else{
                    res.status(400).json({error: true,informacion: "el medio de pago ya esta registrado"});
                }
            }
        }
        registrarTarjeta().then();
    });
})

module.exports = router;