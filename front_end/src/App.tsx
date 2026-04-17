import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Login from "./components/pages/Login";
import Gestao from "./components/pages/Gestao";
import Montagem from "./components/pages/Montagem";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
