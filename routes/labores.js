var express = require('express');
var router = express.Router();

const connect = require('./db_pool_connect');
router.get('/', function (req, res, next){
    connect(function (err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err);
      }
      const listarLabores = async () => {
        client.query(`SELECT * FROM labores_ofertadas;`,function(err,result){
            done(err);
            if (err) {
              return console.error('error running query', err);
            }
            res.status(302).json({error: false, labores: result.rows});
          });
      }
      listarLabores().then()
    });
})

module.exports = router;