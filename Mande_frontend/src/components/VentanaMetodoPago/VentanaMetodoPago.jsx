import React, { useState, useContext } from "react";
import { Modal, TextField, Button, ThemeProvider } from "@mui/material";
import "./ventanaMetodoPago.css";
import { Context } from "../../context/Context";
import useMediaQuery from "@mui/material/useMediaQuery";
import MetodoPago from "./../../assets/metodo_pago.png";
import { asignarDataLogin, dataLogin } from "../../services/datosUsuario";
import AlertMessage from "../AlertMessage/AlertMessage";
import { gridColumnGroupsLookupSelector } from "@mui/x-data-grid";

function VentanaMetodoPago() {
  const [ventanaAbierta, setVentanaAbierta] = useState(false);
  const [numero, setNumero] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [tipo, setTipo] = useState(null);
  const [cvv, setCvv] = useState("");
  const [nombreTitular, setNombreTitular] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");

  const [send, setSend] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [typeError, setTypeError] = useState("success");

  const [bandera,setBandera] = useState(true);

  const abrirCerrarVentana = () => {
    setVentanaAbierta(!ventanaAbierta);
  };

  const enviarDatos = async (e) => {
    // values.password = values.cedula.toString();
    e.preventDefault();
    console.log(dataLogin.usuario.id)

    let toSend = {
      numero: numero,
      id_cliente: dataLogin.usuario.id,
      tipo: tipo,
      cvv: cvv,
      nombre_titular: nombreTitular,
      fecha_vencimiento: fechaVencimiento,
    };

    console.log("Datos antes de enviarse", toSend);

    const datos = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(toSend),
    };

    

  fetch("http://localhost:3000/registrar_medio_pago/", datos)
  .then((res) => {console.log("Datos enviados",res.datos)
    setSend(true);
    setMessage("Tarjeta registrada exitosamente");
    setTypeError("success");
    setAlert(true);
    console.log("enviado")})
  .catch((error) => {
    setMessage("Hubo un error al registrar la tarjeta");
    setTypeError("error");
    setAlert(true);
  });
    abrirCerrarVentana()
    setAlert(false);
    
}




  //Contenido de la ventana
  const body = (
    <div className="ventana_MetodoPago">
      <div className="text-black" align="center">
        <h2>Metodo de Pago</h2>
      </div>
      <div className="max-w-lg mb-3 flex flex-col md:flex-col items-center justify-between gap-1">
        <select onChange={(e) => setTipo(e.target.value)}>
          <option></option>
          <option>debito</option>
          <option>credito</option>
        </select>
        <input
          type="text"
          autoComplete="off"
          className="w-full py-1 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
          placeholder="N° de la tarjeta"
          onChange={(e) => setNumero(e.target.value)}
        />
        <input
          type="text"
          autoComplete="off"
          className="w-full py-1 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
          placeholder="CVV"
          onChange={(e) => setCvv(e.target.value)}
        />
        <input
          type="text"
          autoComplete="off"
          className="w-full py-1 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
          placeholder="Nombre del Titular"
          onChange={(e) => setNombreTitular(e.target.value)}
        />
        <TextField
          fullWidth
          variant="filled"
          color="primary"
          type="date"
          label="Fecha de vencimiento"
          name="fecha_vencimiento"
          onChange={(e) => setFechaVencimiento(e.target.value)}
        />
      </div>

      <button className="botonC_MetodoPago" onClick={enviarDatos}>
        Confirmar
      </button>
      <button className="botonC_MetodoPago" onClick={abrirCerrarVentana}>
        Cancelar
      </button>
    </div>
  );

  return (
    <div>
      {alert ? <AlertMessage message={message} type={typeError} /> : null}
      <button onClick={abrirCerrarVentana} className="botonP_MetodoPago">
        <img src={MetodoPago} width="200" height="200" />
        Metodo de Pago
      </button>
      <Modal open={ventanaAbierta} onClose={abrirCerrarVentana}>
        {body}
      </Modal>
    </div>
  );
}

export default VentanaMetodoPago;
