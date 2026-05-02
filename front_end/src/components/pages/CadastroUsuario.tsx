import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NivelPermissao, Funcionario } from "../index";
import styles from "./CadastroUsuario.module.css";

const CadastroUsuario: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cargo, setCargo] = useState<NivelPermissao | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    const usuariosAtuais: Funcionario[] = JSON.parse(
      localStorage.getItem("@Aerocode:usuarios_db") || "[]",
    );

    if (usuariosAtuais.some((u) => u.usuario === usuario)) {
      alert("Este nome de usuário já existe.");
      return;
    }

    const novoFuncionario: Funcionario = {
      id: Math.random().toString(36).substr(2, 9),
      nome,
      usuario,
      senha,
      telefone: "",
      endereco: "",
      nivelPermissao: cargo as NivelPermissao,
    };

    usuariosAtuais.push(novoFuncionario);
    localStorage.setItem(
      "@Aerocode:usuarios_db",
      JSON.stringify(usuariosAtuais),
    );

    alert(`Parabéns ${nome}, cadastro realizado! Agora você pode logar.`);
    navigate("/");
  };

  return (
    <div className={styles.pageStyle}>
      <div className={styles.cadastroCard}>
        <h2 className={styles.title}>AEROCODE</h2>
        <p className={styles.subtitle}>Crie sua conta de colaborador</p>

        <form onSubmit={handleSubmit} className={styles.border}>
          <input
            type="text"
            placeholder="Nome Completo"
            className={styles.input_style}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Usuário para Login"
            className={styles.input_style}
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />

          <select
            className={styles.input_style}
            value={cargo}
            onChange={(e) => setCargo(e.target.value as NivelPermissao)}
            required
          >
            <option value="">Selecione seu Nível</option>
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

          <input
            type="password"
            placeholder="Confirmar Senha"
            className={styles.input_style}
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />

          <div className={styles.actions}>
            <button type="submit" className={styles.btnCadastro}>
              Cadastrar
            </button>
            <Link to="/" className={styles.loginLink}>
              Já tem conta? <strong>Logar</strong>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroUsuario;
