import React from "react";
import { useState, useContext, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Modal,
  Box,
  IconButton,
  useTheme,
  Rating,
  Typography,
} from "@mui/material";
import { Context } from "../../context/Context";
import { asignarDataLogin, dataLogin } from "../../services/datosUsuario";
import "./serviciosContratados.css";

function ServiciosContratados() {
  const context = useContext(Context);

  const [ventanaAbierta, setVentanaAbierta] = useState(false);

  const [value, setValue] = useState(0);

  const [data, setData] = useState([]);
  const [lista, setLista] = useState();
  const [esperar, setEsperar] = useState(true);

  const [idContratacion, setIdContratacion] = useState();

  function abrirCerrarVentana() {
    setVentanaAbierta(!ventanaAbierta);
  }

  function enviarCalificacion() {
    const config = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        calificacion: value,
      }),
    };

    console.log("config antes de enviar", config);

    fetch(`http://localhost:3000/contratacion/${idContratacion}`, config)
      .then((res) => res.json())
      .then((res) => {
        console.log("contratacion:", res.result);
      });

    console.log("config despues de enviar", config);

    abrirCerrarVentana();

    //let data = { ...context.appState, pTrabajadoresDisponibles: false };
    //context.setAppState(data);
  }

  //Contenido de la ventana
  const body = (
    <div className="ventana_CalificacionServicio">
      <div className="text-black" align="center">
        <h2>Califique el servicio</h2>
      </div>
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <div className="max-w-lg mb-3 flex flex-col md:flex-col items-center justify-between gap-1">
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </div>
      </Box>
      <button
        className="botonC_CalificacionServicio"
        onClick={enviarCalificacion}
      >
        Confirmar
      </button>
      <button
        className="botonC_CalificacionServicio"
        onClick={abrirCerrarVentana}
      >
        Cancelar
      </button>
    </div>
  );

  let columns = [
    { field: "id", headerName: "ID" },
    {
      field: "id_cliente",
      headerName: "ID Cliente",
      flex: 1,
    },
    {
      field: "id_trabajador",
      headerName: "ID trabajador",
      flex: 1,
    },
    {
      field: "id_servicio",
      headerName: "ID servicio",
      flex: 1,
    },
    {
      field: "descripcion_trabajo",
      headerName: "Descripcion trabajo",
      flex: 1,
    },
    {
      field: "calificacion_servicio",
      headerName: "Calificacion servicio",
      flex: 1,
    },
    {
      field: "accion",
      headerName: "Acción",
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => {
                abrirCerrarVentana();
              }}
              className="botonCalificar_ServiciosContratados"
            >
              Calificar
            </button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const id_cliente = dataLogin.usuario.id;
    const id_servicio = context.appState.servicioSolicitado;
    const id_trabajador = context.appState.temporalUser;

    console.log("id_cliente", id_cliente);
    console.log("id_servicio", id_servicio);
    console.log("id_trabajador", id_trabajador);

    fetch(
      `http://localhost:3000/contratacion/${id_cliente}/${id_trabajador}/${id_servicio}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("lista:", res.contratacion);
        setData([res.contratacion]);
        setIdContratacion(res.contratacion.id);
        console.log("data_;", data);
        setEsperar(false);
      });
  }, []);

  console.log("Lista afuera:", lista);

  console.log("contexto", context);

  return (
    <>
      {esperar == false ? (
        <div>
          <Modal open={ventanaAbierta} onClose={abrirCerrarVentana}>
            {body}
          </Modal>
          <div className="text-6xl text-white font-medium mb-2">
            <h1>Servicios contratados</h1>
            {console.log("data grid:", data)}
            <Box
              color={"white"}
              sx={{
                height: 400,
                width: "100%",
                color: "white",
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: "white",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "orange",
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: "rgba(255,255,255,0.8)",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: "orange",
                },
                "& .MuiCheckbox-root": {
                  color: `red !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `orange !important`,
                },
              }}
            >
              <DataGrid
                // checkboxSelection
                color={"white"}
                rows={data}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                pageSize={10}
                initialState={{
                  sorting: {
                    sortModel: [{ field: "id", sort: "asc" }],
                  },
                }}
              />
            </Box>
          </div>
        </div>
      ) : (
        <div>Esperece</div>
      )}
    </>
  );
}

export default ServiciosContratados;
