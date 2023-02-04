import React, { useContext } from "react";
import { Context } from "../../context/Context";
//import "./../App.css";
import Mande from "./../../assets/mande.png";
import { RiLogoutBoxLine } from "react-icons/ri";
import { dataLogin } from "../../services/datosUsuario";

function Header() {
  const context = useContext(Context);
  console.log(context);

  function logOut() {
    window.localStorage.removeItem("loginUser");
    let data = {
      loginState: true,
      roll: null,
      name: null,
      temporalUser: null,
      dataUser: null,
      pTrabajadoresDisponibles: false,
      longitud: null,
      pNotificaciones: false,
      latitud: null,
      servicioSolicitado: null,
      pServiciosContratados: null,
    };
    context.setAppState(data);
  }

  function home() {
    let data = {
      ...context.appState,
      pTrabajadoresDisponibles: false,
      pNotificaciones: false,
      pServiciosContratados: false,
    };
    context.setAppState(data);
  }

  return (
    <>
      <div className=" bg-amber-600 p-4 text-white flex flex-col xl:flex-row gap-4 items-center justify-center md:justify-between">
        <nav className="flex items-center gap-4">
          <button onClick={home}>
          <img src={Mande} width="100" height="100" />
          </button>
        </nav>
        <nav className="flex items-center gap-4">
          {dataLogin.usuario.nombre}
          <button onClick={logOut}>
            <RiLogoutBoxLine />
          </button>
        </nav>
      </div>
    </>
  );
}

export default Header;
