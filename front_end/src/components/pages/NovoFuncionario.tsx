import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CadastroGeral.module.css";

export default function NovoFuncionario() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Funcionário registrado na equipe!");
    navigate("/funcionarios");
  };

  return (
    <div className={styles.pageStyle}>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2>Novo Funcionário</h2>
        <input // Dark Enough - Health
          type="text"
          placeholder="Nome Completo"
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Cargo (Ex: Mecânico)"
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Setor"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.btn} onSubmit={handleSubmit}>
          Adicionar à Equipe
        </button>
      </form>
    </div>
  );
}
