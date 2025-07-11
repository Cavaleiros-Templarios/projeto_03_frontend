import { BrowserRouter, Route, Routes} from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { ToastContainer } from "react-toastify"

import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import ListaClientes from "./components/clientes/listaclientes/ListaClientes";
import FormCliente from "./components/clientes/formcliente/FormCliente";
import DeletarCliente from "./components/clientes/deletarcliente/DeletarCliente";
import ListaOportunidades from "./components/oportunidades/listaoportunidades/ListaOportunidades";
import FormOportunidade from "./components/oportunidades/formoportunidade/FormOportunidade";
import DeletarOportunidade from "./components/oportunidades/deletaroportunidade/DeletarOpotunidade";


function App() {
  

  return (
    <>
    <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/clientes" element={<ListaClientes />} />
              <Route path="/cadastrarcliente" element={<FormCliente />} />
              <Route path="/editarcliente/:id" element={<FormCliente />} />
              <Route path="/deletarcliente/:id" element={<DeletarCliente />} />
              <Route path="/oportunidades" element={<ListaOportunidades />} />
              <Route path="/cadastraroportunidade" element={<FormOportunidade />} />
              <Route path="/editaroportunidade/:id" element={<FormOportunidade />} />
              <Route path="/deletaroportunidade/:id" element={<DeletarOportunidade />} />
              {/* <Route path="/perfil" element={<Perfil />} /> */}
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
