import React, { useContext, useEffect, useState } from "react";
import "./notificaciones.css";
import { Context } from "../../context/Context";
import { asignarDataLogin, dataLogin } from "../../services/datosUsuario";

function Notificaciones() {
  const context = useContext(Context);

  const [tipoServicio, setTipoServicio] = useState("");
  const [descripcionTrabajo, setDescripcionTrabajo] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [apellidosCliente, setApellidosCliente] = useState("");
  const [direccionCliente, setDireccionCliente] = useState("");

  useEffect(() => {
    const idContratacion = 7;

    console.log(`http://localhost:3000/notificacion/${idContratacion}`)

    fetch(`http://localhost:3000/notificacion/${idContratacion}`)
      .then((res) => res.json())
      .then((res) => {
        setTipoServicio(res.informacion.tipo_servicio)
        setDescripcionTrabajo(res.informacion.descripcion_trabajo)
        setNombreCliente(res.informacion.nombre_cliente)
        setApellidosCliente(res.informacion.apellidos_cliente)
        setDireccionCliente(res.informacion.direccion_cliente)
        console.log("informacion:", res.informacion);
      });
  }, []);


    console.log("a",tipoServicio)
    console.log(descripcionTrabajo)
    console.log(nombreCliente)
    console.log(apellidosCliente)
    console.log(direccionCliente)

    //Contenido de la ventana modal
  const body = (
    <div className="text-white bg-black">
      <div className="text-white bg-black text-2xl p-4">
        <h2>Tienes un nuevo trabajo</h2>
      </div>
      <div className="max-w-lg mb-5 flex flex-col md:flex-col justify-between gap-1 p-4">
        <div>Tipo de servicio: {tipoServicio}</div>
        <div>Descripcion del trabajo: {descripcionTrabajo}</div>
        <div>Nombre del cliente: {nombreCliente}</div>
        <div>Apellidos del cliente: {apellidosCliente}</div>
        <div>Direccion del cliente: {direccionCliente}</div>
      </div>
    </div>
  );


  function terminarTrabajo() {
    const config = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id_trabajador: dataLogin.usuario.id,
        disponible: true,
      }),
    };

    fetch(`http://localhost:3000/trabajador`, config)
      .then((res) => res.json())
      .then((res) => {
        console.log("lista:", res);
      });
  }

  return (
    <>
      <div className="text-6xl text-white font-medium mb-4">
        <h1>Notificaciones</h1>
      </div>
      <div>
        {body}
      </div>
      <button
        onClick={terminarTrabajo}
        className="botonNotificaciones text-3xl text-white bg-orange-400 rounded"
      >
        Terminar Trabajo
      </button>
    </>
  );
}

export default Notificaciones;
