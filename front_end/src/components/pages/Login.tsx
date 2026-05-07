import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NivelPermissao, type Funcionario } from "../index";
import { api } from "../../services/api";
import styles from "./Login.module.css";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const funcionarios = api.getFuncionarios();

    if (funcionarios.length === 0) {
      const adminPadrao: Funcionario = {
        id: "1",
        nome: "Engenheiro Chefe",
        telefone: "123",
        endereco: "Hangar 1",
        usuario: "admin",
        senha: "123",
        nivelPermissao: NivelPermissao.ADMINISTRADOR,
      };
      api.saveFuncionario(adminPadrao);
      console.log("LOG: Bem Vindo!.");
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userFound = api.login(usuario, senha);

      localStorage.setItem(
        "@Aerocode:usuario_logado",
        JSON.stringify(userFound),
      );

      navigate("/montagem");
    } catch (error: any) {
      alert("Erro ao acessar: " + error.message);
    }
  };

  return (
    <div className={styles.pageStyle}>
      <div className={styles.loginCard}>
        <h2>AEROCODE</h2>
        <p>Acesse o Sistema de Gestão Aeronáutica</p>

        <form onSubmit={handleLogin} className={styles.border}>
          <div className={styles.inputGroup}>
            <label>Identificação</label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              className={styles.input_style}
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Senha de Segurança</label>
            <input
              type="password"
              placeholder="••••••••"
              className={styles.input_style}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.btnLogar}>
            Entrar no Sistema
          </button>

          <div className={styles.linkContainer}>
            <Link to="/cadastro" className={styles.linkCadastro}>
              Solicitar novo acesso <strong>Cadastre-se</strong>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
