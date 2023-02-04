//import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { useState, useContext } from "react";
import FilesUploadComponent from "../../components/files-upload/files-upload-component";
//import SeleccionarArchivo from "../components/SeleccionarArchivo";
import { Box, Button, TextField, Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./registerC.css";
import IconoMande from "./../../assets/iconoMande.png";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import ContratarServicio from "./../../assets/contratar_servicio.png";
import Rammus from "./../../assets/Rammus.png";
import { Context } from "../../context/Context";

import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";

function RegisterC() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccionResidencia, setDireccionResidencia] = useState("");
  const [documentoIdentidad, setDocumentoIdentidad] = useState("");
  const [reciboPublico, setReciboPublico] = useState(null);
  const [direccionLatitud, setLatitud] = useState(null);
  const [direccionLongitud, setLongitud] = useState(null);
  const [bandera, setBandera] = useState();
  //const [toSend, setToSend] = useState();

  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [send, setSend] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [typeError, setTypeError] = useState("success");

  const context = useContext(Context);

  const subirArchivo = async (e) => {
    setReciboPublico(e);
    console.log("recibopulbico:", reciboPublico);
  };

  const convertirBase64 = (archivos) => {
    Array.from(archivos).forEach((archivo) => {
      var reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = function () {
        var base64 = reader.result;
        console.log("base64", base64);
        setReciboPublico(base64);
        console.log("recibopulbico:", reciboPublico);
      };
    });
  };

  //3b5e5eb5e0bf8f0e37fff0274eacd3c2

  function enviar() {
    //setReciboPublico(ContratarServicio);
    //console.log(ContratarServicio);

    while (bandera) {
      if (toSend.recibo_servicio_publico == null) {
        setBandera(false);
        console.log("Me cago en vos");
      } else {
        setBandera(false);
      }
    }
  }

  const botonArchivos = async (e) => {
    e.preventDefault();
  };

  function calcularCoordenadas(e) {
    e.preventDefault();
    console.log(direccionResidencia);
    /*
    fetch(
      `http://api.positionstack.com/v1/forward?access_key=36463fdc9e4ca60dc7115614c360d565&country=CO&region=Cali&query= ${direccionResidencia}`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setLatitud(response.data[0].latitude);
        setLongitud(response.data[0].longitude);
        console.log(response.data[0].latitude);
        console.log(response.data[0].longitude);
        console.log(direccionLatitud);
        console.log(direccionLongitud);
        handleFormSubmit(e,response.data[0].latitude,response.data[0].longitude)
      })

      .catch((error) => {
        setMessage("Hubo un error al crear el usuario");
        setTypeError("error");
        setAlert(true);
      });
    setAlert(false);
    */
    handleFormSubmit(e,3.3756778707708723,-76.52993899504617)
  }

  function handleFormSubmit(e,lat,lon) {
    // values.password = values.cedula.toString();
    e.preventDefault();
    console.log("recibopulbico async:", reciboPublico);
    console.log("recibopulbico async:", reciboPublico);

    console.log("direccionLatitud:", direccionLatitud);
    console.log("direccionLatitud:", direccionLatitud);

    let toSend = {
      nombre: nombre,
      apellidos: apellidos,
      email: correo,
      numero_celular: celular,
      fecha_nacimiento: fechaNacimiento,
      direccion_residencia: direccionResidencia,
      direccion_latitud: lat,
      direccion_longitud: lon,
      recibo_servicio_publico: reciboPublico,
    };
    console.log("Datos antes de enviarse", toSend);

    const datos = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(toSend),
    };
    if (reciboPublico != null) {
      fetch("http://127.0.0.1:3000/cliente/", datos)
        .then((res) => console.log("Datos enviados", res.datos))
        .then((res) => {
          setSend(true);
          setMessage("Usuario creado exitosamente");
          setTypeError("success");
          setAlert(true);
          console.log("enviado");
        })
        .catch((error) => {
          setMessage("Hubo un error al crear el usuario");
          setTypeError("error");
          setAlert(true);
        });
    } else {
      console.log("error");
    }

    setAlert(false);
  }

  //

  return (
    <>
      {alert ? <AlertMessage message={message} type={typeError} /> : null}
      <div className=" flex flex-col min-h-screen rounded-lg md:p-8">
        <div className="p-8 max-w-lg mb-1 flex flex-col items-center justify-between gap-4">
          <img src={IconoMande} width="200" height="200" />
        </div>
        <div className="p-8">
          <h3 className="text-gray-500 uppercase text-sm font-bold mb-2">
            Empieza gratis
          </h3>
          <h1 className="text-6xl text-white font-medium mb-2">
            Crea una cuenta<span className="text-orange-500">.</span>
          </h1>
          <form>
            <div className="max-w-lg mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <input
                type="text"
                autoComplete="off"
                className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
                placeholder="Nombre(s)"
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="text"
                autoComplete="off"
                className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
                placeholder="Apellidos"
                onChange={(e) => setApellidos(e.target.value)}
              />
            </div>
            <div className="max-w-lg mb-4">
              <input
                type="email"
                autoComplete="off"
                className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
                placeholder="Correo electrónico"
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
            <div className="max-w-lg mb-4">
              <input
                type="text"
                autoComplete="off"
                className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
                placeholder="Numero de celular"
                onChange={(e) => setCelular(e.target.value)}
              />
            </div>
            <h3 className="text-gray-500 text-sm font-bold mb-2">
              Fecha de nacimiento:
            </h3>
            <div className="max-w-lg mb-4">
              <input
                type="date"
                autoComplete="off"
                className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
                placeholder="Fecha de nacimiento"
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </div>
            <div className="max-w-lg mb-4">
              <input
                type="text"
                autoComplete="off"
                className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
                placeholder="Dirección de residencia"
                onChange={(e) => setDireccionResidencia(e.target.value)}
              />
            </div>

            <h3 className="text-gray-500 text-sm font-bold mb-2">
              Carga tu recibo de servicio publico
            </h3>

            <div className="text-white">
              <label className="label">
                <input
                  type="file"
                  name="files"
                  value={""}
                  required
                  className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
                  onChange={(e) => convertirBase64(e.target.files)}
                />
                <span>Seleccionar Archivo</span>
              </label>
            </div>
            <div className="max-w-lg">
              <button
                type="submit"
                className="bg-orange-400 text-white w-full py-3 px-4 rounded-full hover:bg-orange-500 transition-colors"
                onClick={(e) => calcularCoordenadas(e)}
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterC;
