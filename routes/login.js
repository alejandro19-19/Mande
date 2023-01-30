var express = require('express');

var router = express.Router();

const connect = require('./db_pool_connect');


router.get('/', function (req, res, next) {
    connect(function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }

        if (req.body.tipo == "cliente"){

            const verificarCliente = async () => {
                cliente = await client.query(`SELECT email, numero_celular FROM cliente where email = '${req.body.email}' and numero_celular = '${req.body.numero_celular}';`)
                if (cliente.rows.length == 0){
                    
                    res.status(401).json({error: true,informacion: "el usuario no existe"});
                }
                else {
                    res.status(200).json({error: false,informacion: "se ha logueado exitosamente"});
                }
              }
              verificarCliente().then();
        }
        else if(req.body.tipo == "trabajador"){
            const verificarTrabajador = async () => {
                cliente = await client.query(`SELECT email, numero_celular FROM trabajador where email = '${req.body.email}' and numero_celular = '${req.body.numero_celular}';`)
                if (cliente.rows.length == 0){
                    res.status(401).json({error: true,informacion: "el usuario no existe"});
                }
                else {
                    res.status(200).json({error: false,informacion: "se ha logueado exitosamente"});
                }
              }
              verificarTrabajador().then();
        }
        else{
            res.status(400).json({error: true,informacion: "introduzca un tipo valido"});
        }

       //use the client for executing the query
        client.query(`SELECT AVG(calificacion_servicio) FROM contratacion where id_trabajador = '${req.body.id_trabajador}' and id_servicio = '${req.body.id_servicio}';`, function (err, result) {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);
  
        if (err) {
          return console.error('error running query', err);
        }
        res.status(200).json({error: false, "promedio":result.rows[0]});
        });  
    });
})

module.exports = router;