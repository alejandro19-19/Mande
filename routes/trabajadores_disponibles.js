var express = require('express');
var router = express.Router();

const connect = require('./db_pool_connect');

const calcularDistanciaEntreDosCoordenadas = (lat1, lon1, lat2, lon2) => {
    // Convertir todas las coordenadas a radianes
    lat1 = gradosARadianes(lat1);
    lon1 = gradosARadianes(lon1);
    lat2 = gradosARadianes(lat2);
    lon2 = gradosARadianes(lon2);
    // Aplicar fórmula
    const RADIO_TIERRA_EN_KILOMETROS = 6371;
    let diferenciaEntreLongitudes = (lon2 - lon1);
    let diferenciaEntreLatitudes = (lat2 - lat1);
    let a = Math.pow(Math.sin(diferenciaEntreLatitudes / 2.0), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(diferenciaEntreLongitudes / 2.0), 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return RADIO_TIERRA_EN_KILOMETROS * c;
  };
  
const gradosARadianes = (grados) => {
    return grados * Math.PI / 180;
};


/**
 * Listar todos los trabajadores disponibles ordenados por calificacion, distancia y precio
 */
router.get('/:id', function (req, res, next) {
    connect(function (err, client, done) {

        if (err) {
            return console.error('error fetching client from pool', err);
        }
  
        //use the client for executing the query
        const obtenerDistancias = async () => {
        cliente = await client.query(`SELECT * FROM cliente where id = '${req.params.id}';`)
        latitud_cliente = cliente.rows[0].direccion_latitud;
        longitud_cliente = cliente.rows[0].direccion_longitud;

        client.query(`SELECT nombre,apellidos,email,direccion_residencia,direccion_latitud,direccion_longitud,foto_perfil,id_trabajador,id_servicio,calificacion,valor_fraccion FROM trabajadores_disponibles where id_servicio = '${req.params.id}';`, function (err, result) {
            //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
            done(err);
    
            if (err) {
                return console.error('error running query', err);
            }
    
            for (let step = 0; step < result.rows.length; step++) {
                
                auxiliar = calcularDistanciaEntreDosCoordenadas(latitud_cliente, longitud_cliente, result.rows[step].direccion_latitud, result.rows[step].direccion_longitud);
                result.rows[step].distancia_al_cliente = auxiliar; //distancia del trabajador al cliente en KM
                //console.log("este es el step:",step,auxiliar)
            }
            res.status(200).json({error: false, "result":result.rows});
            });
        }
        obtenerDistancias().then();
    });
})

module.exports = router;
