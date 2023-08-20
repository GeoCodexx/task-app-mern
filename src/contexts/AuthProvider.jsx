import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); //Guarda los datos del usuario logeado
  const [isAuthenticated, setIsAuthenticated] = useState(false); //Comprueba si esta o no autenticado el usuario

  //Funcion para guardar datos del usuario logeado
  const signup = async (user) => {
    try {
      //Obtener los datos del usuario logeado
      const res = await loginRequest(user);

      //Guardar para manejar la sesion del usuario
      setUser(res.data);

      //Cambiar el estado cuando se logeee
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
