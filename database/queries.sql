/* Aqui poner las consultas que se usan para el manejo de la infomracion*/

/* Consultas */

/* Consultas para vistas */

-- Vista que almacena a todos los trabajadores que se encuentran disponibles para ser contratados

CREATE VIEW trabajadores_disponibles AS 
 SELECT * FROM trabajador WHERE disponible = true;

 /* Consultas para procedimientos */