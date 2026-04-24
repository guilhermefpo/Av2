import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Login from "./components/pages/Login";
import Gestao from "./components/pages/Gestao";
import Montagem from "./components/pages/Montagem";
import Pecas from "./components/pages/Pecas";
import Testes from "./components/pages/Testes";
import Funcionarios from "./components/pages/Funcionarios";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
