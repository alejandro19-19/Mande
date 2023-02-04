import React, { useState, useContext } from "react";
import { Modal, TextField, Button } from "@mui/material";
import "./ventanaSolicitarServicio.css";
import { Context } from "../../context/Context";
import ContratarServicio from "./../../assets/contratar_servicio.png";

function VentanaSolicitarServicio() {
  let data = {
    pSolicitarServicio: true,
  };

  const context = useContext(Context);

  const [servicio, setServicio] = useState("");
  const [numeroServicio, setNumeroServicio] = useState("");

  const [ventanaAbierta, setVentanaAbierta] = useState(false);

  

  function servicioId() {
    console.log(servicio);

    let data = {
      ...context.appState,
      servicioSolicitado: calcularId().a,
      pTrabajadoresDisponibles: true,
    };
    context.setAppState(data);
  }


  function calcularId() {
    if (servicio === "") {
      return { a: "" };
    } else if (servicio === "paseador de perro") {
      return { a: 1 };
    } else if (servicio === "plomero") {
      return { a: 2 };
    } else if (servicio === "electricista") {
      return { a: 3 };
    } else if (servicio === "cerrajero") {
      return { a: 4 };
    } else if (servicio === "pintor") {
      return { a: 5 };
    } else if (servicio === "profesor de ingles") {
      return { a: 6 };
    }
  }

  const abrirCerrarVentana = () => {
    setVentanaAbierta(!ventanaAbierta);
  };

  function actualizarEstado() {
    if (calcularId().a === "") {
    } else {
      setVentanaAbierta(!ventanaAbierta);

      if(context.serivicioSolicitado==="" ||context.serivicioSolicitado===null){

      }else{
        servicioId();
        console.log("contexto", context);
      }
     
    }
  }

  //Contenido de la ventana
  const body = (
    <div className="ventana_SolicitarServicio">
      <div className="text-black" align="center">
        <h2>Elige el servicio que deseas solicitar</h2>
      </div>
      <div className="max-w-lg mb-3 flex flex-col md:flex-col items-center justify-between gap-1">
        <select onChange={(e) => setServicio(e.target.value)}>
          <option></option>
          <option>paseador de perro</option>
          <option>plomero</option>
          <option>electricista</option>
          <option>cerrajero</option>
          <option>pintor</option>
          <option>profesor de ingles</option>
        </select>
      </div>
      <button className="botonC_SolicitarServicio" onClick={actualizarEstado}>
        Confirmar
      </button>
      <button className="botonC_SolicitarServicio" onClick={abrirCerrarVentana}>
        Cancelar
      </button>
    </div>
  );

  return (
    <div>
      <button onClick={abrirCerrarVentana} className="botonP_SolicitarServicio">
        <img src={ContratarServicio} width="200" height="200" />
        Contratar Servicio
      </button>
      <Modal open={ventanaAbierta} onClose={abrirCerrarVentana}>
        {body}
      </Modal>
    </div>
  );
}

export default VentanaSolicitarServicio;
