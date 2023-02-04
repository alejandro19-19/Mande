import React, { useEffect, useContext, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Modal, Box, IconButton, useTheme } from "@mui/material";
import { Context } from "../../context/Context";
import { asignarDataLogin, dataLogin } from "../../services/datosUsuario";
import {
  listaTrabajadores,
  formatoListaTrabajadores,
} from "../../services/FormatoListaTrabajadores";
import "./trabajadoresDisponibles.css";
import VentanaDescripcion from "../../components/VentanaDescripcion/VentanaDescripcion";

function TrabajadoresDisponibles() {
  const context = useContext(Context);

  const [ventanaAbierta, setVentanaAbierta] = useState(false);
  const [descripcionTrabajo, setDescripcionTrabajo] = useState("");

  function abrirCerrarVentana() {
    setVentanaAbierta(!ventanaAbierta);
  }

  function contratacion() {
    const config = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id_cliente: dataLogin.usuario.id,
        id_trabajador: context.appState.temporalUser,
        id_servicio: context.appState.servicioSolicitado,
        descripcion_trabajo: descripcionTrabajo,
      }),
    };

    console.log("config antes de enviar", config);

    fetch("http://localhost:3000/contratacion", config)
      .then((res) => res.json())
      .then((res) => {
        console.log("contratacion:", res.result);
      });

    console.log("config despues de enviar", config);

    abrirCerrarVentana();

    let data = { ...context.appState, pTrabajadoresDisponibles: false };
    context.setAppState(data);
  }

  //Contenido de la ventana modal
  const body = (
    <div className="ventana_Descripcion">
      <div className="text-black" align="center">
        <h2>Descripcion del trabajo</h2>
      </div>
      <div className="max-w-lg mb-3 flex flex-col md:flex-col items-center justify-between gap-1">
        <textarea
          onChange={(e) => setDescripcionTrabajo(e.target.value)}
          rows="5"
          cols="35"
          placeholder="Escriba aqui la descripcion del trabajo"
        ></textarea>
      </div>
      <button className="botonC_Descripcion" onClick={contratacion}>
        Confirmar
      </button>
      <button className="botonC_Descripcion" onClick={abrirCerrarVentana}>
        Cancelar
      </button>
    </div>
  );

  const [nombreServicio, setNombreServicio] = useState("");
  const [data, setData] = useState([]);
  const [lista, setLista] = useState();
  const [esperar, setEsperar] = useState(true);

  let columns = [
    { field: "id", headerName: "ID" },
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 1,
    },
    {
      field: "apellidos",
      headerName: "Apellidos",
      flex: 1,
    },
    {
      field: "calificacion",
      headerName: "Calificacion",
      flex: 1,
    },
    {
      field: "valor_fraccion",
      headerName: "Valor/Fraccion",
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
                let data = { ...context.appState, temporalUser: params.row.id };
                context.setAppState(data);
                abrirCerrarVentana();
              }}
              className="botonContratar_TrabajadoresDisponibles"
            >
              Contratar
            </button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const config = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id_cliente: dataLogin.usuario.id,
        id_servicio: context.appState.servicioSolicitado,
      }),
    };

    fetch("http://localhost:3000/trabajadores_disponibles", config)
      .then((res) => res.json())
      .then((res) => {
        console.log("lista:", res.result);
        setData(formatoListaTrabajadores(res.result));
        console.log("data_;", data);
        setEsperar(false);
      });

    if (context.appState.servicioSolicitado == 1) {
      setNombreServicio("Paseadores de perros");
    } else if (context.appState.servicioSolicitado == 2) {
      setNombreServicio("Plomeros");
    } else if (context.appState.servicioSolicitado == 3) {
      setNombreServicio("Electricistas");
    } else if (context.appState.servicioSolicitado == 4) {
      setNombreServicio("Cerrajeros");
    } else if (context.appState.servicioSolicitado == 5) {
      setNombreServicio("Pintores");
    } else if (context.appState.servicioSolicitado == 6) {
      setNombreServicio("Profesores de Ingles");
    }
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
            <h1>{nombreServicio} Disponibles</h1>
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

export default TrabajadoresDisponibles;
