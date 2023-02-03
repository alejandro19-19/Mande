const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');

const queryRouter = require('./routes/query');
const clienteRouter = require('./routes/cliente');
const trabajadorRouter = require('./routes/trabajador');

const rserivicioRouter = require('./routes/rservicio')
const rpagoRouter = require('./routes/registrar_medio_pago')
const contratacionRouter = require('./routes/contratacion')
const tdisponiblesRouter = require('./routes/trabajadores_disponibles')
const laborsRouter = require('./routes/labores')
const notificacionRouter = require('./routes/notificacion')
//const cpromedio = require('./routes/calificacion_promedio') CONSIDERAR SU ELIMINACION
const loginRouter = require('./routes/login')
const pagosRouter = require('./routes/pagos')

const DIRECTORIO_PERMITIDO_CORS = 'http://localhost:5173/';
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true, parameterLimit: 100000000,limit:"500mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors(corsOptions));

app.use('/login', loginRouter);

app.use('/ejecutar_query', queryRouter);
app.use('/cliente', clienteRouter);
app.use('/trabajador', trabajadorRouter);

app.use('/registrar_servicio', rserivicioRouter);
app.use('/registrar_medio_pago', rpagoRouter);
app.use('/contratacion', contratacionRouter);
app.use('/trabajadores_disponibles', tdisponiblesRouter);
app.use('/listar_labores', laborsRouter);
app.use('/notificacion', notificacionRouter)
app.use('/registrar_pago', pagosRouter)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
