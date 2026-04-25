import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./NovoAviao.module.css";
import aviaoImg from "../../assets/aviao.png";

const NovoAviao: React.FC = () => {
  const navigate = useNavigate();
  const [modelo, setModelo] = useState("");
  const [status, setStatus] = useState<"Iniciado" | "Em Teste" | "Atrasado">(
    "Em Teste",
  );
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cadastrando avião:", { modelo, status, data, descricao });
    navigate("/gestao");
  };

  return (
    <div className={styles.pageStyle}>
      <section className={styles.contentGrid}>
        <div className={styles.aviaoImage}>
          <img src={aviaoImg} alt="Avião AEROCODE" />
        </div>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Novo Projeto</h2>
          <p className={styles.subtitle}>
            Inicie a montagem de uma nova aeronave
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Modelo da Aeronave (ex: Boeing 737)"
              className={styles.input_style}
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              required
            />

            <select
              className={styles.input_style}
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              <option value="Em Teste">Em Teste</option>
              <option value="Iniciado">Iniciado</option>
              <option value="Atrasado">Atrasado</option>
            </select>

            <input
              type="date"
              className={styles.input_style}
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />

            <textarea
              placeholder="Descrição do projeto (opcional)"
              className={styles.textarea_style}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />

            <div className={styles.actions}>
              <button type="submit" className={styles.btnSalvar}>
                Iniciar Projeto
              </button>
              <Link to="/gestao" className={styles.cancelarLink}>
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default NovoAviao;
