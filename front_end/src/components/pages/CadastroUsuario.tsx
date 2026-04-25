import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LinkBotao from "../layout/LinkBotao";
import styles from "./CadastroUsuario.module.css";

const CadastroUsuario: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cargo, setCargo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }
    console.log("Cadastrando usuário:", { nome, usuario, cargo });
    alert("Parábens, mais um usuário cadastrado com sucesso!");
    alert("Clique em Logar, preencha os campos e entre no site!");
    navigate("/");
  };

  return (
    <div className={styles.pageStyle}>
      <div className={styles.cadastroCard}>
        <h2 className={styles.title}>AEROCODE</h2>
        <p className={styles.subtitle}>Crie sua conta</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome Completo"
            className={styles.input_style}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Usuário"
            className={styles.input_style}
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cargo"
            className={styles.input_style}
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className={styles.input_style}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            className={styles.input_style}
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
          <div className={styles.actions}>
            <button type="submit" className={styles.btnCadastro}>
              Cadastrar
            </button>
            <Link to="/" className={styles.loginLink}>
              Já tem conta? Logar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroUsuario;
