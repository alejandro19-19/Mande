import React, { useContext } from "react";
import { Context } from "./context/Context";
import Inicio from "./pages/Inicio/Inicio";
import InicioCopy from "./pages/Inicio/InicioCopy";
import Header from "./components/Header/Header";
import Menu from "./pages/Menu/Menu";
import { ThemeProvider, createTheme } from "@mui/material";
import "./App.css";

function App() {

  const theme= createTheme({
    palette:{
      primary:{
        main: '##ea580c'
      },
      secondary:{
        main: '#ea580c'
      }
    }
  });

  const context = useContext(Context);
  //console.log(context);
  return (
    <ThemeProvider theme={theme}>
      {context.appState.loginState ? (
        <div className="tabPanel register">
          <Inicio />
        </div>
      ) : (
        <div className="contenedor">
            <div className="hp">
            <Menu />
            </div>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
