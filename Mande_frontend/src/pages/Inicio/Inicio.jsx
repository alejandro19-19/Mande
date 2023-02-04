import { useState, useContext } from "react";
import * as React from "react";
//import "./../App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import RegisterT from "../RegisterT/RegisterT";
import RegisterC from "../RegisterC/RegisterC";
import Login from "../Login/Login";
import { Context } from "../../context/Context";
import { Switch } from "@mui/material";

function Inicio() {
  const context = useContext(Context);

  console.log(context);

  return (
    <BrowserRouter>
    <div className="max-w-lg mb-4 flex flex-col items-center justify-between gap-1">
      <header>
        <div className="max-w-lg mb-4 flex flex-col md:flex-row items-center justify-between gap-1">
          <Link to="/">
            <button className="bg-orange-400 text-white w-full py-3 px-4 rounded-full hover:bg-orange-500 transition-colors">
              Iniciar sesión
            </button>
          </Link>
          <Link to="/registroC">
            <button className="bg-orange-400 text-white w-full py-3 px-4 rounded-full hover:bg-orange-500 transition-colors">
              Registro Clientes
            </button>
          </Link>
          <Link to="/registroT">
            <button className="bg-orange-400 text-white w-full py-3 px-4 rounded-full hover:bg-orange-500 transition-colors">
              Registro Trabajadores
            </button>
          </Link>
        </div>
      </header>



      <Routes>
      <Route path='/' element={<Login/>}/>
      
      <Route path='/registroC' element={<RegisterC/>}/>
        
 
      <Route path='/registroT' element={<RegisterT/>}/>
        
      </Routes>
      </div>



    </BrowserRouter>
  );
}

export default Inicio;
