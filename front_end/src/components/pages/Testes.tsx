import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { type TesteQualidade } from "../index";
import styles from "./Testes.module.css";

const Testes: React.FC = () => {
  const [testes, setTestes] = useState<TesteQualidade[]>([]);

  useEffect(() => {
    const salvo = localStorage.getItem("@Aerocode:testes_qualidade");
    if (salvo) {
      setTestes(JSON.parse(salvo));
    }
  }, []);

  const handleExcluir = (id: string) => {
    if (window.confirm("Deseja deletar este registro?")) {
      const novo = testes.filter((t) => t.id !== id);
      setTestes(novo);
      localStorage.setItem("@Aerocode:testes_qualidade", JSON.stringify(novo));
    }
  };

  return (
    <div className={styles.pageStyle}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>✔️ Testes de Qualidade</h1>
          <div className={styles.headerBtns}>
            <Link to="/montagem" className={styles.my_link}>
              Voltar
            </Link>
            <Link to="/novo-teste" className={styles.my_link_add}>
              + Novo
            </Link>
          </div>
        </header>

        <div className={styles.gridTestes}>
          {testes.map((t) => (
            <div key={t.id} className={styles.cardTeste}>
              <div className={styles.cardHeader}>
                <span className={`${styles.status} ${styles[t.resultado]}`}>
                  {t.resultado}
                </span>
              </div>

              <div className={styles.cardBody}>
                <p>
                  <strong>Nome:</strong> {t.tipo}
                </p>
                <p>
                  <strong>Cód:</strong> {t.id}
                </p>
                <p>
                  <strong>Data:</strong> {t.data}
                </p>
              </div>

              <button
                onClick={() => handleExcluir(t.id)}
                className={styles.btnDeletar}
              >
                Excluir
              </button>
            </div>
          ))}
        </div>

        {testes.length === 0 && (
          <p className={styles.empty}>Nenhum relatório encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Testes;
