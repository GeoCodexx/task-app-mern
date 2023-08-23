//import Sidebar from "./components/Sidebar";
import RoutesMain from "./routes/RoutesMain";

function App() {
  /*const { isAuthenticated, signin, user } = useAuth();

  // Restaurar datos del usuario al cargar la página
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      signin(user);
    }
  }, [login]);

  // Guardar datos del usuario al autenticarse
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [isAuthenticated]);

*/
  return (
    <>
      <RoutesMain />
    </>
  );
}

export default App;
