import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CadastroGeral.module.css";

export default function NovaPeca() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [qtd, setQtd] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Peça adicionada ao estoque!");
    navigate("/pecas");
  };

  return (
    <div className={styles.pageStyle}>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2>Nova Peça</h2>
        <input
          type="text"
          placeholder="Nome da Peça"
          className={styles.input}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          className={styles.input}
          onChange={(e) => setQtd(e.target.value)}
          required
        />
        <button type="submit" className={styles.btn} onSubmit={handleSubmit}>
          Cadastrar no Estoque
        </button>
      </form>
    </div>
  );
}
