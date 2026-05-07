import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusPeca, TipoPeca, type Peca } from "../index";
import styles from "./CadastroGeral.module.css";

export default function NovaPeca() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [qtd, setQtd] = useState<number>(0);
  const [tipo, setTipo] = useState<TipoPeca>(TipoPeca.NACIONAL);
  const [status, setStatus] = useState<StatusPeca>(StatusPeca.PRODUCAO);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const novaPeca: Peca = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      nome,
      quantidade: qtd,
      fornecedor: "Almoxarifado Central",
      tipo: tipo,
      status: status,
    };

    const estoqueAtual: Peca[] = JSON.parse(
      localStorage.getItem("@Aerocode:pecas") || "[]",
    );

    estoqueAtual.push(novaPeca);
    localStorage.setItem("@Aerocode:pecas", JSON.stringify(estoqueAtual));

    alert(`Sucesso: ${nome} registrada no sistema.`);
    navigate("/pecas");
  };

  return (
    <div className={styles.pageStyle}>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2>Gestão de Inventário</h2>
        <p className={styles.subtitle}>Novo componente para a linha Aerocode</p>

        <div className={styles.inputGroup}>
          <label>Descrição Técnica</label>
          <input
            type="text"
            placeholder="Ex: Sensor de Pitot"
            className={styles.input}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Quantidade</label>
            <input
              type="number"
              className={styles.input}
              value={qtd}
              onChange={(e) => setQtd(Number(e.target.value))}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Origem</label>
            <select
              className={styles.input}
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoPeca)}
            >
              <option value={TipoPeca.NACIONAL}>Nacional</option>
              <option value={TipoPeca.IMPORTADA}>Importada</option>
            </select>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>Status Inicial</label>
          <select
            className={styles.input}
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusPeca)}
          >
            <option value={StatusPeca.PRODUCAO}>Em Produção</option>
            <option value={StatusPeca.PRONTA}>Disponível no Estoque</option>
            <option value={StatusPeca.TRANSPORTE}>Transporte</option>
          </select>
        </div>

        <div className={styles.btnGroup}>
          <button type="submit" className={styles.btn}>
            📦 Registrar Peça
          </button>
          <button
            type="button"
            className={styles.btnVoltar}
            onClick={() => navigate("/pecas")}
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}
