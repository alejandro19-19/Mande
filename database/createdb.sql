CREATE DATABASE mande_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    TEMPLATE template0;

\c mande_db

CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    numero_celular VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    direccion_residencia VARCHAR(100) NOT NULL,
    recibo_servicio_publico VARCHAR(300) NOT NULL
);

CREATE TABLE trabajador (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    numero_celular VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    direccion_residencia VARCHAR(100) NOT NULL,
    disponible BOOLEAN NOT NULL,
    documento_identidad VARCHAR(300) NOT NULL,
    foto_perfil VARCHAR(300) NOT NULL
);

CREATE TABLE servicio (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL
);

CREATE TABLE tarjeta (
    id SERIAL PRIMARY KEY
    numero INT PRIMARY KEY,
    id_cliente INT NOT NULL,
    tipo VARCHAR(100) NOT NULL,
    cvv VARCHAR(100) NOT NULL,
    nombre_titular VARCHAR(100) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    CONSTRAINT fk_cliente_tarjeta
        FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

CREATE TABLE pago (
    id SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_tarjeta INT NOT NULL,
    id_trabajador INT NOT NULL,
    valor_pago INT NOT NULL,
    CONSTRAINT fk_cliente_pago
        FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    CONSTRAINT fk_tarjeta_pago
        FOREIGN KEY (id_tarjeta) REFERENCES tarjeta(id),
    CONSTRAINT fk_trabajador_pago
        FOREIGN KEY (id_trabajador) REFERENCES trabajador(id)
);

CREATE TABLE contratacion(
    id SERIAL PRIMARY KEY,
    id_cliente INT PRIMARY KEY,
    id_trabajador INT PRIMARY KEY,
    id_servicio INT PRIMARY KEY,
    descripcion_trabajo VARCHAR(300),
    calificacion_servicio FLOAT NOT NULL,
    CONSTRAINT fk_cliente_contratacion
        FOREIGN KEY (id_cliente) ref REFERENCES cliente(id),
    CONSTRAINT fk_trabajador_contratacion
        FOREIGN KEY (id_trabajador) REFERENCES trabajador(id),
    CONSTRAINT fk_servicio_contratacion
        FOREIGN KEY (id_servicio) REFERENCES servicio(id)
);

CREATE TABLE prestar_servicio (
    id_trabajador INT PRIMARY KEY,
    id_servicio INT PRIMARY KEY,
    calificacion FLOAT NOT NULL,
    valor_fraccion INT NOT NULL,
    CONSTRAINT fk_trabajadro_prestar_servicio
        FOREIGN KEY (id_trabajador) REFERENCES trabajador(id),
    CONSTRAINT fk_servicio_prestar_servicio
        FOREIGN KEY (id_servicio) REFERENCES servicio(id)
);
