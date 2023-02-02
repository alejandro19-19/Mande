var express = require('express');
var router = express.Router();
const connect = require('./db_pool_connect');
var config = require('./config');


 



//parece que esto sobra con el connect
const { Client } = require('pg');
const { database, password } = require('./config');

const prueba = async () => {
  const client = new Client(config)
  await client.connect()
  
  const res = await client.query('select * from servicio')
  console.log(res.rows[0]) // Hello world!
  await client.end()
  
}

prueba().then();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hola mundo de las bases de datos');
});

module.exports = router;

