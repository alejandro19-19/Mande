-- inserts de prueba
  INSERT INTO  trabajador(nombre,apellidos,email,numero_celular,fecha_nacimiento,direccion_residencia,direccion_latitud,direccion_longitud,documento_identidad,foto_perfil) VALUES 
('alejandro', 'escobar', 'alejandro@gmail.com', '1234', '2019-01-01', 'calle 5 prueba',19.416326917410476,-99.12479042256915, 'direcciondeldocumento', 'foto'),
('alejandro', 'peñaranda', 'peñaranda@gmail.com', '1234', '2019-01-01', 'calle 4 prueba',19.416326917410476,-99.12479042256915, 'direcciondeldocumento', 'foto')
;

INSERT INTO  cliente(nombre,apellidos,email,numero_celular,fecha_nacimiento,direccion_residencia,direccion_latitud,direccion_longitud,recibo_servicio_publico) VALUES 
('juan', 'santa', 'juan@gmail.com', '1234', '2019-01-01', 'calle 5 prueba',23.097069089850933,-82.35006433419622, 'recibo'),
('miguel', 'fernandez', 'miguel@gmail.com', '1234', '2019-01-01', 'calle 4 prueba',23.097069089850933,-82.35006433419622, 'elrecibo')
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
