import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [nivelAcesso, setNivelAcesso] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("@Aerocode:usuario", usuario);
    localStorage.setItem("@Aerocode:cargo", nivelAcesso);
    localStorage.setItem("@Aerocode:senha", senha);

    navigate("/gestao");
  };

  return (
    <div className={styles.pageStyle}>
      <div className={styles.loginCard}>
        <h2>AEROCODE</h2>
        <p>Acesse o Sistema de Gestão</p>
        <form onSubmit={handleLogin} className={styles.border}>
          <input
            type="text"
            placeholder="Usuário"
            className={styles.input_style}
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />

          <select
            className={styles.input_style}
            value={nivelAcesso}
            onChange={(e) => setNivelAcesso(e.target.value)}
            required
          >
            <option value="">Nível de Acesso</option>
            <option value="ADM">ADM</option>
            <option value="Engenheiro">Engenheiro</option>
            <option value="Operador">Operador</option>
          </select>

          <input
            type="password"
            placeholder="Senha"
            className={styles.input_style}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <br />
          <br />

          <button type="submit" className={styles.btnLogar}>
            Logar
          </button>

          <div className={styles.linkContainer}>
            <Link to="/cadastro" className={styles.linkCadastro}>
              Não tem uma conta? <strong>Cadastre-se aqui</strong>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
