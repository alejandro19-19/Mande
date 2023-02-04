import React, { useState, useContext } from "react";
import { Modal, TextField, Button } from "@mui/material";
import "./ventanaDescripcion.css";
import { Context } from "../../context/Context";
import ContratarServicio from "./../../assets/contratar_servicio.png";

function VentanaDescripcion() {
  const [ventanaAbierta, setVentanaAbierta] = useState(false);

  const abrirCerrarVentana = () => {
    setVentanaAbierta(!ventanaAbierta);
  };

  //Contenido de la ventana
  const body = (
    <div className="ventana_Descripcion">
      <div className="text-black" align="center">
        <h2>Descripcion del trabajo</h2>
      </div>
      <div className="max-w-lg mb-3 flex flex-col md:flex-col items-center justify-between gap-1">
        <textarea rows="5" cols="35" placeholder="Escriba aqui la descripcion del trabajo">
        </textarea>
      </div>
      <button className="botonC_Descripcion" onClick={abrirCerrarVentana}>
        Confirmar
      </button>
      <button className="botonC_Descripcion" onClick={abrirCerrarVentana}>
        Cancelar
      </button>
    </div>
  );

  return (
    <div>
      <button onClick={abrirCerrarVentana} className="botonP_Descripcion">
        <img src={ContratarServicio} width="200" height="200" />
        Contratar Servicio
      </button>
      <Modal open={ventanaAbierta} onClose={abrirCerrarVentana}>
        {body}
      </Modal>
    </div>
  );
}

export default VentanaDescripcion;
