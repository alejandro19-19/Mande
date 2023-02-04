import React, { useState } from "react";
export const Context = React.createContext({});

export default function ContextProvider({ children }) {
  let data = {
    loginState: true,
    roll: null,
    name: null,
    temporalUser: null,
    dataUser: null,
    pTrabajadoresDisponibles: false,
    pNotificaciones: false,
    pServiciosContratados: false,
    longitud: null,
    latitud: null,
    servicioSolicitado: null,
    contratacionId: null,
  };
  const [appState, setAppState] = useState(data);
  return (
    <Context.Provider value={{ appState, setAppState }}>
      {children}
    </Context.Provider>
  );
}