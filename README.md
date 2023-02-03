# Mande - Proyecto Bases de Datos
***
## Integrantes: 
  * Alejandro Peñaranda Agudelo - 1941008
  * Alejandro Escobar Tafurt - 1941378
  * Juan Camilo Santa Gomez - 1943214


## Instalacion
***
Pasos preliminares:
```
- Instalar postgresql 15
- Instalar nodeJS version 18
- Clonar el repositorio con el siguiente comando:

$ git clone https://github.com/alejandro19-19/Mande.git

```
Pasos para crear la base de datos en postgresl:
```
En sql shell ejecutar los siguientes comandos:

$ \cd /path/to/the/file/  (path al directorio Mande_database del proyecto)
$ \i createbd.sql
```
Pasos para ejecutar el Backend:
```
Primero se debe ir al archivo config.js que se encuentra en el direcctorio /Mande_backend/routes/config.js, dentro de él 
se debe modificar el password por el que se tenga asignado para postgresql. Ademas si su usuario de postgresql es diferente
a "postgres" tambien debe cambiarlo por el que se tenga registrado.

Despues se ejecutan los siguientes comandos:

$ cd ../path/to/the/file   (path al directorio Mande_backend del proyecto)
$ npm install
$ npm start
```
Pasos para ejecutar el Frontend:
```
$ cd ../path/to/the/file  (path al directorio Mande_frontend del proyecto)
$ npm install
$ npm run dev
```
