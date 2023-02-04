import React, { useState, useContext } from "react";
import { Modal, TextField, Button } from "@mui/material";
import "./ventanaRegistroValido.css";
import { Context } from "../../context/Context";
import ContratarServicio from "./../../assets/contratar_servicio.png";

function VentanaRegistroValido() {

  const [ventanaAbierta, setVentanaAbierta] = useState(false);

  const abrirCerrarVentana = () => {
    setVentanaAbierta(!ventanaAbierta);
  };

  //Contenido de la ventana
  const body = (
    <div className="ventana_RegistroValido">
      <div className="text-white font-medium tracking-widest" align="center">
        <h2>El registro ha sido exitoso</h2>
      </div>
      <div className="max-w-lg flex flex-col md:flex-col items-center justify-between gap-1">
      <button className="botonC_RegistroValido" onClick={abrirCerrarVentana}>
        Cerrar
      </button>
      </div>
    </div>
  );

  return (
    <div>
      <button onClick={abrirCerrarVentana} className="botonP_RegistroValido">
        <img src={ContratarServicio} width="200" height="200" />
        Contratar Servicio
      </button>
      <Modal open={ventanaAbierta} onClose={abrirCerrarVentana}>
        {body}
      </Modal>
    </div>
  );
}

export default VentanaRegistroValido;