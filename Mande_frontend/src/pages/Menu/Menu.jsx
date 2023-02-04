import React, { useContext } from "react";
import { Context } from "../../context/Context";
import MenuCliente from "../MenuCliente/MenuCliente";
import MenuTrabajador from "../MenuTrabajador/MenuTrabajador";
import Header from "../../components/Header/Header";
import ServiciosContratados from "../ServiciosContratados/ServiciosContratados";
import TrabajadoresDisponibles from "../TrabajadoresDisponibles/TrabajadoresDisponibles";
import { asignarDataLogin, dataLogin } from "../../services/datosUsuario";
import Notificaciones from "../Notificaciones/Notificaciones";
//import "./../App.css";

function Menu() {
  const context = useContext(Context);
  console.log("dataLogin",dataLogin);
  console.log("TrabajadoresDisponibles",context.appState.pTrabajadoresDisponibles)
  console.log("appState",context.appState)
  //dataLogin.tipo == "cliente" || 
  return (
    <>
      {dataLogin.tipo == "cliente"||context.appState.roll =="cliente"? (
        <div>
          <Header />
          {context.appState.pTrabajadoresDisponibles && context.appState.servicioSolicitado!==""?  (<TrabajadoresDisponibles/>):context.appState.pServiciosContratados?(<ServiciosContratados/>): (<MenuCliente/>)}
        </div>
      ) : dataLogin.tipo == "trabajador" ?(
        <div>
          <Header />
          {context.appState.pNotificaciones?  (<Notificaciones/>): (<MenuTrabajador />)}
        </div>
      ):(<div></div>)}
    </>
  );
}

export default Menu;
