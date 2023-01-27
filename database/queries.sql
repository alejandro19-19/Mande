/* Aqui poner las consultas que se usan para el manejo de la infomracion*/

/* Consultas */

/* Consultas para vistas */

-- Vista que almacena a todos los trabajadores que se encuentran disponibles para ser contratados

CREATE VIEW trabajadores_disponibles AS 
 SELECT * FROM trabajador WHERE disponible = true;

 /* Consultas para procedimientos */ 
 
 //consultas de insercion. Recuerde cambiar la tabla de trabajador
 
 INSERT INTO  trabajador(nombre,apellidos,email,numero_celular,fecha_nacimiento,direccion_residencia,documento_identidad,foto_perfil) VALUES 
('alejandro', 'escobar', 'alejandro@gmail.com', '1234', '2019-01-01', 'calle 5 prueba', 'direcciondeldocumento', 'foto'),
('alejandro', 'peñaranda', 'peñaranda@gmail.com', '1234', '2019-01-01', 'calle 4 prueba', 'direcciondeldocumento', 'foto')
;

INSERT INTO  cliente(nombre,apellidos,email,numero_celular,fecha_nacimiento,direccion_residencia,recibo_servicio_publico) VALUES 
('juan', 'santa', 'juan@gmail.com', '1234', '2019-01-01', 'calle 5 prueba', 'recibo'),
('miguel', 'fernandez', 'miguel@gmail.com', '1234', '2019-01-01', 'calle 4 prueba', 'elrecibo')
;
