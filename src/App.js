import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import {Navbar} from "./components/UI/Navbar/Navbar";
import AuthProvider from "./components/context/auth";
import {AppRoutes} from "./routes/AppRoutes";

function App() {
  return (
<AuthProvider>
    <BrowserRouter>
    <Navbar/>
   <AppRoutes/>
</BrowserRouter>
</AuthProvider>

  );
}

export default App;
