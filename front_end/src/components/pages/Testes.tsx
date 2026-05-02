import React, { useState, useEffect } from "react";
import styles from "./Testes.module.css";
import { Link } from "react-router-dom";
import { TesteQualidade } from "../index";

const Testes: React.FC = () => {
  const [testes, setTestes] = useState<TesteQualidade[]>([]);

  useEffect(() => {
    const salvo = localStorage.getItem("@Aerocode:testes_qualidade");
    if (salvo) {
      setTestes(JSON.parse(salvo));
    } else {
      const lista: TesteQualidade[] = [
        {
          id: "T-001",
          aeronave: "EMB-314",
          tipo: "Segurança",
          resultado: "Aprovado",
        },
        { id: "T-002", aeronave: "KC-390", tipo: "Motor", resultado: "Falha" },
      ];
      setTestes(lista);
      localStorage.setItem("@Aerocode:testes_qualidade", JSON.stringify(lista));
    }
  }, []);

  const handleExcluir = (id: string) => {
    if (window.confirm("Deseja deletar este registro de teste?")) {
      const novo = testes.filter((t) => t.id !== id);
      setTestes(novo);
      localStorage.setItem("@Aerocode:testes_qualidade", JSON.stringify(novo));
    }
  };

  return (
    <div className={styles.pageStyle}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>✔️ Controle de Qualidade</h1>
          <div className={styles.headerBtns}>
            <Link to="/montagem" className={styles.my_link}>
              Voltar
            </Link>
            <Link to="/novo-teste" className={styles.my_link_add}>
              + Novo Teste
            </Link>
          </div>
        </header>

        <div className={styles.gridTestes}>
          {testes.map((t) => (
            <div key={t.id} className={styles.cardTeste}>
              <div className={styles.cardHeader}>
                <h3>{t.aeronave}</h3>
                <span className={`${styles.status} ${styles[t.resultado]}`}>
                  {t.resultado}
                </span>
              </div>
              <p>
                <strong>ID:</strong> {t.id}
              </p>
              <p>
                <strong>Tipo:</strong> {t.tipo}
              </p>
              <button
                onClick={() => handleExcluir(t.id)}
                className={styles.btnDeletar}
              >
                Excluir Registro
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testes;
