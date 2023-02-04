import React, { useState, useContext } from "react";
import { Modal, TextField, Button, Box, Rating, Typography} from "@mui/material";
import "./ventanaCalificacionServicio.css";
import { Context } from "../../context/Context";
import ContratarServicio from "./../../assets/contratar_servicio.png";

function VentanaCalificacionServicio() {

  const [ventanaAbierta, setVentanaAbierta] = useState(false);

  const [value, setValue] = useState(0);

  const abrirCerrarVentana = () => {
    setVentanaAbierta(!ventanaAbierta);
  };

  //Contenido de la ventana
  const body = (
    <div className="ventana_CalificacionServicio">
      <div className="text-black" align="center">
        <h2>Califique el servicio</h2>
      </div>
      <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
        <div className="max-w-lg mb-3 flex flex-col md:flex-col items-center justify-between gap-1">
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      </div>
      </Box>
      <button className="botonC_CalificacionServicio" onClick={abrirCerrarVentana}>
        Confirmar
      </button>
      <button className="botonC_CalificacionServicio" onClick={abrirCerrarVentana}>
        Cancelar
      </button>
    </div>
  );

  return (
    <div>
      <button onClick={abrirCerrarVentana} className="botonP_CalificacionServicio">
        <img src={ContratarServicio} width="200" height="200" />
        Contratar Servicio
      </button>
      <Modal open={ventanaAbierta} onClose={abrirCerrarVentana}>
        {body}
      </Modal>
    </div>
  );
}

export default VentanaCalificacionServicio;