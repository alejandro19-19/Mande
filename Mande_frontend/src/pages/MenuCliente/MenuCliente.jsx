import React, { useContext } from "react";
import { Context } from "../../context/Context";
//import "./../App.css";
import "./menuCliente.css";
import ContratarServicio from "./../../assets/contratar_servicio.png";
import MetodoPago from "./../../assets/metodo_pago.png";
import ServiciosContratados from "./../../assets/servicios_contratados.png";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { spacing } from "@mui/system";
import VentanaSolicitarServicio from "../../components/VentanaSolicitarServicio/VentanaSolicitarServicio";
import VentanaMetodoPago from "../../components/VentanaMetodoPago/VentanaMetodoPago";
import VentanaCalificacionServicio from "../../components/VentanaCalificacionServicio/VentanaCalificacionServicio";
import VentanaDescripcion from "../../components/VentanaDescripcion/VentanaDescripcion";
import VentanaTrabajoFinalizado from "../../components/VentanaTrabajoFinalizado/VentanaTrabajoFinalizado";
import VentanaRegistroValido from "../../components/VentanaRegistroValido/VentanaRegistroValido";
import VentanaRegistroInvalido from "../../components/VentanaRegistroInvalido/VentanaRegistroInvalido";

function MenuCliente() {
  const context = useContext(Context);

  function abrirServiciosContratados(){
    let data={
      ...context.appState,
      pServiciosContratados: true,
    }
    context.setAppState(data);

  }

  return (
    
    <Box  width={"100%"} display={"flex"} justifyContent={"center"}>
    <Grid
      container
      height={"90vh"}
      width={"700px"}
      justifyContent={"center"}
      spacing={3}
      alignItems={"center"}
      direction={"row"}
    >
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
        <VentanaSolicitarServicio/>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
        <VentanaMetodoPago/>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <button  onClick={abrirServiciosContratados} className="boton1">
            <img src={ServiciosContratados} width="200" height="200" />
            Servicios Contratados
          </button>
        </Grid>
    </Grid>
    </Box>
  );
}

export default MenuCliente;
