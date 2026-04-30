import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CadastroGeral.module.css";

export default function EditarFuncionario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [setor, setSetor] = useState("");

  useEffect(() => {
    if (id === "101") {
      setNome("Carlos Andrade");
      setCargo("Engenheiro");
      setSetor("Montagem");
    }
  }, [id]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Funcionário ${nome} atualizado com sucesso!`);
    navigate("/funcionarios");
  };

  return (
    <div className={styles.pageStyle}>
      <form className={styles.formCard} onSubmit={handleUpdate}>
        <h2>Editar Funcionário</h2>
        <p className={styles.subtitle}>ID do Registro: {id}</p>

        <input
          type="text"
          className={styles.input}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome Completo"
          required
        />

        <select
          className={styles.input}
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          required
        >
          <option value="">Selecione o Cargo</option>
          <option value="Operador">Operador</option>
          <option value="ADM">ADM</option>
          <option value="Engenheiro">Engenheiro</option>
        </select>

        <input
          type="text"
          className={styles.input}
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
          placeholder="Setor"
          required
        />

        <button type="submit" className={styles.btn}>
          Salvar Alterações
        </button>
        <button
          type="button"
          className={styles.btnVoltar}
          onClick={() => navigate("/funcionarios")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
