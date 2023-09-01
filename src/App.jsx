//import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import RoutesMain from "./routes/RoutesMain";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

function App() {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RoutesMain />
        <Footer />
      </QueryClientProvider>
    </>
  );
}

export default App;
