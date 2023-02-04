//import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { useState } from "react";
import FilesUploadComponent from "../../components/files-upload/files-upload-component";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconoMande from "./../../assets/iconoMande.png";
import AlertMessage from "../../components/AlertMessage/AlertMessage";

function RegisterT() {

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccionRecidencia, setDireccionRecidencia] = useState("");
  const [direccionLatitud, setLatitud] = useState("");
  const [direccionLongitud, setLongitud] = useState("");
  const [documentoIdentidad, setDocumentoIdentidad] = useState(null);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [send, setSend] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [typeError, setTypeError] = useState("success");

  const convertirBase64DocumentoIdentiadad = (archivos) => {
    Array.from(archivos).forEach((archivo) => {
      var reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = function () {
        var base64 = reader.result;
        console.log("base64",base64);
        setDocumentoIdentidad(base64);
        console.log("documentoIdentidad:",documentoIdentidad)
      };
    });
    
  };

  const convertirBase64FotoPerfil = (archivos) => {
    Array.from(archivos).forEach((archivo) => {
      var reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = function () {
        var base64 = reader.result;
        console.log("base64",base64);
        setFotoPerfil(base64);
        console.log("fotoPerfil:",fotoPerfil)
      };
    });
    
  };


  const handleFormSubmit = async (e) => {
    // values.password = values.cedula.toString();
    e.preventDefault();
    let toSend = {
      nombre: nombre,
      apellidos: apellidos,
      email: correo,
      numero_celular: celular,
      fecha_nacimiento: fechaNacimiento,
      direccion_residencia: direccionRecidencia,
      direccion_latitud: 3.4315406985801196,
      direccion_longitud: -76.5466855560936,
      documento_identidad: documentoIdentidad,
      foto_perfil: fotoPerfil,
    };

    console.log(toSend);

    // console.log(values)
    const datos = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(toSend),
    };

    //Oe, este link debe corresponder con el host donde se creen clientes, o con el local que están usando.
    fetch("http://localhost:3000/trabajador/", datos)
      .then((response) => response.json())
      // .then((response) => {
      //   if (!response.ok) {
      //     return Promise.reject();
      //   }
      // })
      .then((response) => {
        setSend(true);
        setMessage("Usuario creado exitosamente");
        setTypeError("success");
        setAlert(true);
        //inicio();
      })
      .catch((error) => {
        setMessage("Hubo un error al crear el usuario");
        setTypeError("error");
        setAlert(true);
      });
    // .then((json) => console.log("json ", json));
    //Limpiar las casillas.

    // console.log("datos ", JSON.stringify(values));
    // console.log(`Mi nombre es ${values.name}`)
  };

  return (
    <>
    {alert ? <AlertMessage message={message} type={typeError} /> : null}
      <div className=" flex flex-col min-h-screen rounded-lg md:p-8">
        <div className="p-8 max-w-lg mb-1 flex flex-col items-center justify-between gap-4">
        <img src={IconoMande} width="200" height="200"/>
        </div>
        <div className="p-8">
          <h3 className="text-gray-500 uppercase text-sm font-bold mb-2">
            Empieza gratis
          </h3>
          <h1 className="text-6xl text-white font-medium mb-2">
            Crea una cuenta<span className="text-orange-500">.</span>
          </h1>
    
          <form className="mt-8">
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
                onChange={(e) => setDireccionRecidencia(e.target.value)}
              />
            </div>
            
            <h3 className="text-gray-500 text-sm font-bold mb-2">
              Carga tu foto de perfil
            </h3>
            <div className="text-white">
            <label className="label">
            <input
              type="file"
              name="files"
              value={""}
              required
              className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
              onChange={(e) => convertirBase64FotoPerfil(e.target.files)}
            />
            <span>Seleccionar Archivo</span>
            </label>
            </div>

            <h3 className="text-gray-500 text-sm font-bold mb-2">
              Carga tu documento de identidad
            </h3>
            <div className="text-white">
            <label className="label">
            <input
              type="file"
              name="files"
              value={""}
              required
              className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
              onChange={(e) => convertirBase64DocumentoIdentiadad(e.target.files)}
            />
            <span>Seleccionar Archivo</span>
            </label>
            </div>
              

        
            <div className="max-w-lg">
              <button className="bg-orange-500 text-white w-full py-3 px-4 rounded-full hover:bg-orange-600 transition-colors" onClick={handleFormSubmit}>
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterT;
