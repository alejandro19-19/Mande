import React, { useContext } from "react";
import { Context } from "../../context/Context";
//import "./../App.css";
import PrestarServicios from "./../../assets/prestar_servicios.png";
import Notificaciones from "./../../assets/notificaciones.png";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./menuTrabajador.css";
import VentanaSolicitarServicio from "../../components/VentanaSolicitarServicio/VentanaSolicitarServicio";
import VentanaPrestarServicios from "../../components/VentanaPrestarServicios/VentanaPrestarServicios";

function MenuTrabajador() {

  const context = useContext(Context);

  function abrirNotificaciones(){
    let data={
      ...context.appState,
      pNotificaciones: true,
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
    <VentanaPrestarServicios/>
    </Grid>
    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
    <button  onClick={abrirNotificaciones} className="boton text-white bg-orange-400 rounded">
          <img src={Notificaciones} width="200" height="200" />Notificaciones
        </button>
    </Grid>
</Grid>
</Box>
  );
}

export default MenuTrabajador;
