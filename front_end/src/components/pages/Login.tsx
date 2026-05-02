import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NivelPermissao } from "../index";
import styles from "./Login.module.css";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [nivelAcesso, setNivelAcesso] = useState<NivelPermissao | "">("");
  const navigate = useNavigate();

  useEffect(() => {
    const usuarios = localStorage.getItem("@Aerocode:usuarios_db");
    if (!usuarios) {
      const adminPadrao: Funcionario = {
        id: "1",
        nome: "Engenheiro Chefe",
        telefone: "123",
        endereco: "Hangar 1",
        usuario: "admin",
        senha: "123",
        cargo: "Engenheiro",
        setor: "Geral",
        status: "Ativo",
        nivelPermissao: NivelPermissao.ADMINISTRADOR,
      };
      localStorage.setItem(
        "@Aerocode:usuarios_db",
        JSON.stringify([adminPadrao]),
      );
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const usuariosCadastrados: Funcionario[] = JSON.parse(
      localStorage.getItem("@Aerocode:usuarios_db") || "[]",
    );

    const userFound = usuariosCadastrados.find(
      (u) =>
        u.usuario === usuario &&
        u.senha === senha &&
        u.nivelPermissao === nivelAcesso,
    );

    if (userFound) {
      localStorage.setItem(
        "@Aerocode:usuario_logado",
        JSON.stringify(userFound),
      );

      localStorage.setItem("@Aerocode:cargo", userFound.nivelPermissao);

      navigate("/gestao");
    } else {
      alert("Dados de acesso incorretos ou nível de permissão inválido.");
    }
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
            onChange={(e) => setNivelAcesso(e.target.value as NivelPermissao)}
            required
          >
            <option value="">Nível de Acesso</option>

            <option value={NivelPermissao.ADMINISTRADOR}>Administrador</option>
            <option value={NivelPermissao.ENGENHEIRO}>Engenheiro</option>
            <option value={NivelPermissao.OPERADOR}>Operador</option>
          </select>

          <input
            type="password"
            placeholder="Senha"
            className={styles.input_style}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

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
