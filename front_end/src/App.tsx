import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import EditarFuncionario from "./components/pages/EditarFuncionario";
import "./index.css";

const Protegida = ({ children }: { children: React.ReactNode }) => {
  const usuario = localStorage.getItem("@Aerocode:usuario_logado");

  const estaLogado = usuario !== null && usuario !== "";

  if (!estaLogado) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />

        <Route
          path="/gestao"
          element={
            <Protegida>
              <Gestao />
            </Protegida>
          }
        />
        <Route
          path="/montagem"
          element={
            <Protegida>
              <Montagem />
            </Protegida>
          }
        />
        <Route
          path="/pecas"
          element={
            <Protegida>
              <Pecas />
            </Protegida>
          }
        />
        <Route
          path="/testes"
          element={
            <Protegida>
              <Testes />
            </Protegida>
          }
        />
        <Route
          path="/funcionarios"
          element={
            <Protegida>
              <Funcionarios />
            </Protegida>
          }
        />
        <Route
          path="/novo-aviao"
          element={
            <Protegida>
              <NovoAviao />
            </Protegida>
          }
        />
        <Route
          path="/nova-peca"
          element={
            <Protegida>
              <NovaPeca />
            </Protegida>
          }
        />
        <Route
          path="/novo-teste"
          element={
            <Protegida>
              <NovoTeste />
            </Protegida>
          }
        />
        <Route
          path="/novo-funcionario"
          element={
            <Protegida>
              <NovoFuncionario />
            </Protegida>
          }
        />
        <Route
          path="/editar-funcionario/:id"
          element={
            <Protegida>
              <EditarFuncionario />
            </Protegida>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
