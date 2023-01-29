const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');


const helloRouter = require('./routes/hello');
const indexRouter = require('./routes/index');
const crearRouter = require('./routes/crear');

const queryRouter = require('./routes/query');
const clienteRouter = require('./routes/cliente');
const trabajadorRouter = require('./routes/trabajador');

const rserivicioRouter = require('./routes/rservicio')
const rpagoRouter = require('./routes/registrar_medio_pago')
const contratacionRouter = require('./routes/contratacion')
const tdisponibles = require('./routes/trabajadores_disponibles')
const laborsRouter = require('./routes/labores')
const notificacionRouter = require('./routes/notificacion')

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/hello', helloRouter);
app.use('/', indexRouter);
app.use('/crear', crearRouter);

app.use('/ejecutar_query', queryRouter);
app.use('/cliente', clienteRouter);
app.use('/trabajador', trabajadorRouter);

app.use('/registrar_servicio', rserivicioRouter);
app.use('/registrar_medio_pago', rpagoRouter);
app.use('/contratacion', contratacionRouter);
app.use('/trabajadores_disponibles', tdisponibles);
app.use('/listar_labores', laborsRouter);
app.use('/notificacion',notificacionRouter)


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
