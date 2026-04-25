import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Login from "./components/pages/Login";
import Gestao from "./components/pages/Gestao";
import Montagem from "./components/pages/Montagem";
import Pecas from "./components/pages/Pecas";
import Testes from "./components/pages/Testes";
import Funcionarios from "./components/pages/Funcionarios";
import NovoAviao from "./components/pages/NovoAviao";
import CadastroUsuario from "./components/pages/CadastroUsuario";
import NovaPeca from "./components/pages/NovoPeca";
import NovoTeste from "./components/pages/NovoTeste";
import NovoFuncionario from "./components/pages/NovoFuncionario";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />

        <Route
          path="/gestao"
          element={
            <>
              <Header />
              <Gestao />
            </>
          }
        />
        <Route
          path="/montagem"
          element={
            <>
              <Header />
              <Montagem />
            </>
          }
        />
        <Route
          path="/pecas"
          element={
            <>
              <Header />
              <Pecas />
            </>
          }
        />
        <Route
          path="/testes"
          element={
            <>
              <Header />
              <Testes />
            </>
          }
        />
        <Route
          path="/funcionarios"
          element={
            <>
              <Header />
              <Funcionarios />
            </>
          }
        />
        <Route
          path="/novo-aviao"
          element={
            <>
              <Header />
              <NovoAviao />
            </>
          }
        />
        <Route
          path="/nova-peca"
          element={
            <>
              <Header />
              <NovaPeca />
            </>
          }
        />
        <Route
          path="/novo-teste"
          element={
            <>
              <Header />
              <NovoTeste />
            </>
          }
        />
        <Route
          path="/novo-funcionario"
          element={
            <>
              <Header />
              <NovoFuncionario />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
