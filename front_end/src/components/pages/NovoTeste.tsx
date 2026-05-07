import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { type TesteQualidade } from "../index";
import styles from "./CadastroGeral.module.css";

export default function NovoTeste() {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState<TesteQualidade["tipo"]>("Elétrico");
  const [resultado, setResultado] =
    useState<TesteQualidade["resultado"]>("Aprovado");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    const novoTeste: TesteQualidade = {
      id: `T-${Math.floor(1000 + Math.random() * 9000)}`, 
      tipo: tipo,
      resultado: resultado,
      data: new Date().toLocaleDateString("pt-BR"), 
    };

   
    const salvos = localStorage.getItem("@Aerocode:testes_qualidade");
    const listaAtual = salvos ? JSON.parse(salvos) : [];

    const novaLista = [...listaAtual, novoTeste];
    localStorage.setItem(
      "@Aerocode:testes_qualidade",
      JSON.stringify(novaLista),
    );

    alert("Relatório de teste registrado com sucesso!");
    navigate("/testes");
  };

  return (
    <div className={styles.pageStyle}>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2>Registrar Teste de Qualidade</h2>
        <p className={styles.subtitle}>Inspeção técnica de conformidade</p>

        <div className={styles.inputGroup}>
          <label>Tipo de Inspeção</label>
          <select
            className={styles.input}
            value={tipo}
            onChange={(e) => setTipo(e.target.value as any)}
            required
          >
            <option value="Elétrico">Sistemas Elétricos</option>
            <option value="Hidráulico">Sistemas Hidráulicos</option>
            <option value="Aerodinâmico">Estrutural / Aerodinâmico</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Resultado Final</label>
          <select
            className={styles.input}
            value={resultado}
            onChange={(e) => setResultado(e.target.value as any)}
            required
          >
            <option value="Aprovado">🟢 Aprovado</option>
            <option value="Reprovado">🔴 Reprovado</option>
          </select>
        </div>

        <div className={styles.btnGroup}>
          <button type="submit" className={styles.btn}>
            Salvar Relatório
          </button>
          <button
            type="button"
            className={styles.btnVoltar}
            onClick={() => navigate("/testes")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
