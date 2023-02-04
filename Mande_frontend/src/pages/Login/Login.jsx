import { data } from "autoprefixer";
import { useState, useContext, useEffect, useRef } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import IconoMande from "./../../assets/iconoMande.png";
import { asignarDataLogin, dataLogin } from "../../services/datosUsuario";
import { Context } from "../../context/Context";

function Login() {
  const context = useContext(Context);
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [tipo, setTipo] = useState(null);
  const [userInit, setInit] = useState("");

  //Esto es para cuando se refresca la página no perder la sesión iniciada.
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loginUser");
    if (loggedUserJSON && JSON.parse(loggedUserJSON).error != true) {
      const user = JSON.parse(loggedUserJSON);
      asignarDataLogin(user);
      let data = {
        ...context.appState,
        loginState: false,
        name: dataLogin.name,
        roll: dataLogin.tipo,
      };
      context.setAppState(data);
    }
  }, []);

  //Este bloque se encarga de pedir el token a la bd, y hacer modificaciones del usuario.
  //----------------------------------------------------------------------------
  const consultaUsuarioBD = async (config) => {
    const data = await fetch("http://127.0.0.1:3000/login", config);
    return data.json();
  };

  const login = async (e) => {
    e.preventDefault();
    const config = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        tipo: tipo,
        email: email,
        numero_celular: contraseña,
      }),
    };
    const response = await consultaUsuarioBD(config);
    console.log("response:",response)
    //console.log("resp", response)
    asignarDataLogin(response);
    emailValidation();

    window.localStorage.setItem("loginUser", JSON.stringify(dataLogin));
  };

  const emailValidation = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    //console.log("emailValidation", dataLogin.error)
    //console.log("Validación", dataLogin.error != true)
    if (dataLogin.error != false) {
      alert("Datos erróneos o incompletos, verifique o intente nuevamente");
    } else if (regEx.test(email)) {
      setInit(
        JSON.stringify({
          tipo: tipo,
          email: email,
          numero_celular: contraseña,
        })
      );
      let data = {
        ...context.appState,
        loginState: false,
        name: dataLogin.name,
        roll: dataLogin.tipo,
      };
      //client, admin, operator, manager -> Esto debe de obtenerse desde la data que se trae.

      context.setAppState(data);
      // setLoginActivated(!loginActivated);
      // console.log(loginState);
    } else if (!regEx.test(user) && user !== "") {
      alert("Direccion de Correo invalida");
    } else {
      alert("Malo");
    }
  };

  return (
    <div>
      <div>
        <div className=" flex flex-col min-h-screen rounded-lg md:p-8">
          <div className="p-8 max-w-lg mb-1 flex flex-col items-center justify-between gap-4">
            <h1 className="text-gray-100 text-3xl font-medium tracking-widest">
              Bienvenido a Mande
            </h1>
            <div className="max-w-lg mb-1 flex flex-col items-center justify-between gap-4">
              <img src={IconoMande} width="200" height="200" />
            </div>
          </div>
          <div className="p-8">
            <h3 className="text-gray-500 uppercase text-sm font-bold mb-2">
              Ingresa a la plataforma
            </h3>
            <h1 className="text-6xl text-white font-medium mb-2">
              Inicia sesión<span className="text-orange-500">.</span>
            </h1>

            <form className="mt-8">
            <div className="max-w-lg flex justify-center mb-6">
                <a
                  href="#"
                  className="text-gray-500 font-medium hover:text-gray-300 transition-colors"
                >
                  Tipo de usuario:
                </a>
              
              <select onChange={(e) => setTipo(e.target.value)}>
                <option></option>
                <option>cliente</option>
                <option>trabajador</option>
              </select>
              </div>
              <div className="max-w-lg mb-4">
                <input
                  type="email"
                  autoComplete="off"
                  id="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
                  placeholder="Correo electrónico"
                />
              </div>
              <div className="max-w-lg mb-4">
                <input
                  type="password"
                  autoComplete="off"
                  id="contraseña"
                  onChange={(e) => setContraseña(e.target.value)}
                  className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group"
                  placeholder="Contraseña"
                />
              </div>
             
              <div className="max-w-lg">
                <button
                  onClick={login}
                  type="submit"
                  className="bg-orange-400 text-white w-full py-3 px-4 rounded-full hover:bg-orange-500 transition-colors"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
