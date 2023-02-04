import React, { useState } from "react";
import "./ventanaPrestarServicios.css";
import { Modal, TextField, Button } from "@mui/material";
import PrestarServicios from "./../../assets/prestar_servicios.png";
import { dataLogin } from "../../services/datosUsuario";
import AlertMessage from "../AlertMessage/AlertMessage";

function VentanaPrestarServicios() {
  const [plomero, setPlomero] = useState(false);
  const [cerrajero, setCerrajero] = useState(false);
  const [profesorIngles, setProfesorIngles] = useState(false);
  const [paseadorPerros, setPaseadorPerros] = useState(false);
  const [electricista, setElectricista] = useState(false);
  const [pintor, setPintor] = useState(false);

  const [valorPlomero, setValorPlomero] = useState("");
  const [valorCerrajero, setValorCerrajero] = useState("");
  const [valorProfesorIngles, setValorProfesorIngles] = useState("");
  const [valorPaseadorPerros, setValorPaseadorPerros] = useState("");
  const [valorElectricista, setValorElectricista] = useState("");
  const [valorPintor, setValorPintor] = useState("");

  const [ventanaAbierta, setVentanaAbierta] = useState(false);

  const [send, setSend] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [typeError, setTypeError] = useState("success");
  
  const abrirCerrarVentana = () => {
    setVentanaAbierta(!ventanaAbierta);
  };

 function enviarDatos(idServicio,valor) {
    const config = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id_servicio: idServicio,
        id_trabajador: dataLogin.usuario.id,
        valor_fraccion: valor,
      }),
    };

    console.log("config antes de enviar", config);

       fetch("http://localhost:3000/registrar_servicio", config)
      .then((res) => res.json())
      .then((res) => {
        console.log("servicio:", res.result);
        setSend(true);
        setMessage("Trabajo registrado exitosamente");
        setTypeError("success");
        setAlert(true);
        console.log("enviado");
      })
      .catch((error) => {
        setMessage("Ya prestas este servicio");
        setTypeError("error");
        setAlert(true);
      });

      setAlert(false);

    console.log("config despues de enviar", config);

  }

  const body = (
    <div className="ventana_PrestarServicios">
      {alert ? <AlertMessage message={message} type={typeError} /> : null}
      <div className=" mb-2">
        <div className="text-black" align="center">
          <h2>Escoge los servicios que deseas prestar</h2>
        </div>
        <Button
          variant="contained"
          color={plomero ? "success" : "error"}
          sx={{
            borderRadius: "15px",
          }}
          onClick={() => {
            setPlomero(!plomero);
          }}
        >
          Plomero
        </Button>
        <Button
          variant="contained"
          color={electricista ? "success" : "error"}
          sx={{
            borderRadius: "15px",
          }}
          onClick={() => {
            setElectricista(!electricista);
          }}
        >
          Electricista
        </Button>
        <Button
          variant="contained"
          color={pintor ? "success" : "error"}
          sx={{
            borderRadius: "15px",
          }}
          onClick={() => {
            setPintor(!pintor);
          }}
        >
          Pintor
        </Button>
        <Button
          variant="contained"
          color={cerrajero ? "success" : "error"}
          sx={{
            borderRadius: "15px",
          }}
          onClick={() => {
            setCerrajero(!cerrajero);
          }}
        >
          Cerrajero
        </Button>
        <Button
          variant="contained"
          color={profesorIngles ? "success" : "error"}
          sx={{
            borderRadius: "15px",
          }}
          onClick={() => {
            setProfesorIngles(!profesorIngles);
          }}
        >
          Profesor de Ingles
        </Button>
        <Button
          variant="contained"
          color={paseadorPerros ? "success" : "error"}
          sx={{
            borderRadius: "15px",
          }}
          onClick={() => {
            setPaseadorPerros(!paseadorPerros);
          }}
        >
          Paseador de Perros
        </Button>
      </div>
      {plomero ? (
        <div className="max-w-lg mb-2 flex flex-col md:flex-row items-center justify-between gap-1">
          <input
            type="text"
            autoComplete="off"
            className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
            placeholder="Valor/Fraccion Plomero"
            onChange={(e) => setValorPlomero(e.target.value)}
          />
          <div>
          <button onClick={()=>enviarDatos(2,valorPlomero)} className="botonC_PrestarServicios">Ok</button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {electricista ? (
        <div className="max-w-lg mb-2 flex flex-col md:flex-row items-center justify-between gap-1">
          <input
            type="text"
            autoComplete="off"
            className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
            placeholder="Valor/Fraccion Electricista"
            onChange={(e) => setValorElectricista(e.target.value)}
          />
          <button onClick={()=>enviarDatos(3,valorElectricista)} className="botonC_PrestarServicios">Ok</button>
        </div>
      ) : (
        <div></div>
      )}
      {pintor ? (
        <div className="max-w-lg mb-2 flex flex-col md:flex-row items-center justify-between gap-1">
          <input
            type="text"
            autoComplete="off"
            className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
            placeholder="Valor/Fraccion Pintor"
            onChange={(e) => setValorPintor(e.target.value)}
          />
          <button onClick={()=>enviarDatos(5,valorPintor)} className="botonC_PrestarServicios">Ok</button>
        </div>
      ) : (
        <div></div>
      )}
      {cerrajero ? (
        <div className="max-w-lg mb-2 flex flex-col md:flex-row items-center justify-between gap-1">
          <input
            type="text"
            autoComplete="off"
            className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
            placeholder="Valor/Fraccion Cerrajero"
            onChange={(e) => setValorCerrajero(e.target.value)}
          />

          <button onClick={()=>enviarDatos(4,valorCerrajero)} className="botonC_PrestarServicios">Ok</button>

        </div>
      ) : (
        <div></div>
      )}
      {profesorIngles ? (
        <div className="max-w-lg mb-2 flex flex-col md:flex-row items-center justify-between gap-1">
          <input
            type="text"
            autoComplete="off"
            className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
            placeholder="Valor/Fraccion Profesor"
            onChange={(e) => setValorProfesorIngles(e.target.value)}
          />
          <button onClick={()=>enviarDatos(6,valorProfesorIngles)} className="botonC_PrestarServicios">Ok</button>
        </div>
      ) : (
        <div></div>
      )}
      {paseadorPerros ? (
        <div className="max-w-lg mb-2 flex flex-col md:flex-row items-center justify-between gap-1">
          <input
            type="text"
            autoComplete="off"
            className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
            placeholder="Valor/Fraccion Paseador perros"
            onChange={(e) => setValorPaseadorPerros(e.target.value)}
          />
          <button onClick={()=>enviarDatos(1,valorPaseadorPerros)} className="botonC_PrestarServicios">Ok</button>
        </div>
      ) : (
        <div></div>
      )}

      <button className="botonC_PrestarServicios" onClick={abrirCerrarVentana}>
        Cerrar
      </button>
    </div>
  );

  return (
    <div>
      <button onClick={abrirCerrarVentana} className="botonP_PrestarServicios">
        <img src={PrestarServicios} width="200" height="200" />
        Prestar Servicios
      </button>
      <Modal open={ventanaAbierta} onClose={abrirCerrarVentana}>
        {body}
      </Modal>
    </div>
  );
}

export default VentanaPrestarServicios;
