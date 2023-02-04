import React, { useState, useContext } from "react";
import { Modal, TextField, Button } from "@mui/material";
import "./ventanaTrabajoFinalizado.css";
import { Context } from "../../context/Context";
import ContratarServicio from "./../../assets/contratar_servicio.png";

function VentanaTrabajoFinalizado() {
  const [ventanaAbierta, setVentanaAbierta] = useState(false);

  const abrirCerrarVentana = () => {
    setVentanaAbierta(!ventanaAbierta);
  };

  //Contenido de la ventana
  const body = (
    <div className="ventana_TrabajoFinalizado">
      <div className="text-black mb-3" align="center">
        <h2>TrabajoFinalizado</h2>
      </div>
      <div className="max-w-lg flex flex-col md:flex-col items-center justify-between gap-1">
      <button className="botonC_TrabajoFinalizado" onClick={abrirCerrarVentana}>
        Cerrar
      </button>
      </div>
    </div>
  );

  return (
    <div>
      <button onClick={abrirCerrarVentana} className="botonP_TrabajoFinalizado">
        <img src={ContratarServicio} width="200" height="200" />
        Contratar Servicio
      </button>
      <Modal open={ventanaAbierta} onClose={abrirCerrarVentana}>
        {body}
      </Modal>
    </div>
  );
}

export default VentanaTrabajoFinalizado;