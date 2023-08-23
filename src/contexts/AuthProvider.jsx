import { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  verifyState,
} from "../api/auth";
//import jsCookie from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); //Guarda los datos del usuario logeado
  const [isAuthenticated, setIsAuthenticated] = useState(false); //Comprueba si esta o no autenticado el usuario
  const [isRegistered, setIsRegistered] = useState(false);
  const [errors, setErrors] = useState([]); //Bandera para mostrar mensaje de datos invalidos para el login

  //Funcion para guardar datos del usuario logeado
  const signup = async (user) => {
    try {
      //Obtener los datos del usuario logeado
      await registerRequest(user);
      setIsRegistered(true);
    } catch (error) {
      console.log(error);
      setIsRegistered(false);

      const formatedError = error.response.data.hasOwnProperty("error")
        ? error.response.data.error
        : error.response.data;

      setErrors(formatedError);
    }
  };

  //Funcion para guardar datos del usuario logeado
  const signin = async (user) => {
    try {
      //Obtener los datos del usuario logeado
      const res = await loginRequest(user);

      //Guardar para manejar la sesion del usuario
      setUser(res.data.user);

      //Guardar datos en el localstorage (Persistencia de Estado)
      localStorage.setItem("token", res.data.token);
      //Cambiar el estado cuando se logeee
      //setErrors([]);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      if (error.code !== "ERR_NETWORK") {
        const formatedError = error.response.data.hasOwnProperty("error")
          ? error.response.data.error
          : error.response.data;
        setErrors(formatedError);
      }
    }
  };

  const logout = () => {
    logoutRequest();
    setIsAuthenticated(false);
    setUser([]);
    localStorage.removeItem("token");
  };

  //Hook function para gestionar los avisos de error en los formularios de registro y login
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 7000);
      //cuando ya no se use el componente se limpia el timer
      return () => clearTimeout(timer);
    }
  }, [errors]);

  //Hook function para verificar si el usuario esta autenticado y hacer la persistencia de datos del usuario (localstorage y cookies)
  useEffect(() => {
    const checkLogin = async () => {
      //Verificar si existe o no el token en el localstorage
      if (!localStorage.getItem("token")) {
        setIsAuthenticated(false);
        //Si no existe, termina la funcion.
        return;
      }

      try {
        //Se obtiene el token desde el localstorage
        const token = localStorage.getItem("token");

        //Se llama a funcion para verificar la validez del token
        const res = await verifyState(token);

        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);

        //Se restaura los datos del usuario y se asignaa al estado global (user).
        setUser(res.data.user);

        //Se vuelve a guardar el nuevo token en el localstorage
        localStorage.setItem("token", res.data.token);
      } catch (error) {
        //Si existe algun error se muestra el error en consola y se reinicia los valores a un estado cero la aplicacion.
        console.log(error);
        setUser([]);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setIsAuthenticated,
        signup,
        signin,
        logout,
        isRegistered,
        setIsRegistered,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
