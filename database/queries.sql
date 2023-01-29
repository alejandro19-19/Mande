/* Aqui poner las consultas que se usan para el manejo de la infomracion*/

/* Consultas */

/* Consultas para vistas */

-- Vista que almacena a todos los trabajadores que se encuentran disponibles para ser contratados

/* Esta vista almacena a todos los trabajadores que se encuentran disponibles para ser contratados*/
CREATE VIEW trabajadores_disponibles AS 
 SELECT * FROM trabajador WHERE disponible = true;

/* Esta vista almacena la informacion que es necesaria para enviar la notificacion al trabajador cada vez que sea contratado por un cliente*/
CREATE VIEW notificacion_contratacion AS
SELECT R1.id contratacion_id, R1.id_cliente, R1.id_trabajador,R1.id_servicio,R1.descripcion_trabajo,R1.nombre nombre_cliente,R1.apellidos apellidos_cliente,R1.direccion_residencia direccion_cliente,s.tipo tipo_servicio 
FROM servicio s RIGHT JOIN (SELECT cion.id,cion.id_cliente,cion.id_trabajador, cion.id_servicio, cion.descripcion_trabajo,cl.nombre, cl.apellidos, cl.direccion_residencia  
FROM contratacion cion LEFT JOIN cliente cl ON cion.id_cliente = cl.id) AS R1 ON s.id = R1.id_servicio ORDER BY R1.id ASC;

 /* Consultas para procedimientos */ 
CREATE VIEW labores_ofertadas AS
SELECT DISTINCT id_servicio, tipo tipo_servicio FROM prestar_servicio ps LEFT JOIN servicio s ON ps.id_servicio = s.id ORDER BY id_servicio ASC;

 
/* consultas de insercion */
 
 INSERT INTO  trabajador(nombre,apellidos,email,numero_celular,fecha_nacimiento,direccion_residencia,documento_identidad,foto_perfil) VALUES 
('alejandro', 'escobar', 'alejandro@gmail.com', '1234', '2019-01-01', 'calle 5 prueba', 'direcciondeldocumento', 'foto'),
('alejandro', 'peñaranda', 'peñaranda@gmail.com', '1234', '2019-01-01', 'calle 4 prueba', 'direcciondeldocumento', 'foto')
;

INSERT INTO  cliente(nombre,apellidos,email,numero_celular,fecha_nacimiento,direccion_residencia,recibo_servicio_publico) VALUES 
('juan', 'santa', 'juan@gmail.com', '1234', '2019-01-01', 'calle 5 prueba', 'recibo'),
('miguel', 'fernandez', 'miguel@gmail.com', '1234', '2019-01-01', 'calle 4 prueba', 'elrecibo')
;

INSERT INTO servicio (tipo) VALUES
('paseador de perro'),
('plomero'),
('electricista'),
('cerrajero'),
('pintor'),
('profesor de ingles');

INSERT INTO prestar_servicio(id_trabajador,id_servicio,valor_fraccion) VALUES
(1,6,30000),
(2,3,50000),
(1,1,10000),
(2,5,100000),
(1,5,100000);