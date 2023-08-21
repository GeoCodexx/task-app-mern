import { createContext, useEffect, useState } from "react";
import { loginRequest, registerRequest } from "../api/auth";

export const AuthContext = createContext();

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
      console.log("Asignando a falso");
      const formatedError = error.response.data.hasOwnProperty("error") ? error.response.data.error : error.response.data
      setErrors(formatedError);
    }
  };

  //Funcion para guardar datos del usuario logeado
  const signin = async (user) => {
    try {
      //Obtener los datos del usuario logeado
      const res = await loginRequest(user);
      //console.log(res);
      //Guardar para manejar la sesion del usuario
      setUser(res.data);
      //Cambiar el estado cuando se logeee
      setErrors([]);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  //Hook para gestionar los avisos de error en los formularios de registro y login
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 7000);
      //cuando ya no se use el componente se limpia el timer
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setIsAuthenticated,
        signup,
        signin,
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
