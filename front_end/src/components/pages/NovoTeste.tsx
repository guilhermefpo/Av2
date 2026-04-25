import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CadastroGeral.module.css";

export default function NovoTeste() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Relatório de teste enviado!");
    navigate("/testes");
  };

  return (
    <div className={styles.pageStyle}>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2>Registrar Teste</h2>
        <input
          type="text"
          placeholder="Aeronave (Ex: Boeing 737)"
          className={styles.input}
          required
        />
        <select className={styles.input} required>
          <option value="">Resultado do Teste</option>
          <option value="Aprovado">Aprovado</option>
          <option value="Pendente">Pendente</option>
          <option value="Falha">Falha</option>
        </select>
        <button type="submit" className={styles.btn} onSubmit={handleSubmit}>
          Salvar Relatório
        </button>
      </form>
    </div>
  );
}
