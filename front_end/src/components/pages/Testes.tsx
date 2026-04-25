import React from "react";
import styles from "./Testes.module.css";
import { Link } from "react-router-dom";

interface TesteQualidade {
  id: string;
  aeronave: string;
  tipo: "Segurança" | "Sistemas" | "Motor";
  resultado: "Aprovado" | "Pendente" | "Falha";
}

const listaTestes: TesteQualidade[] = [
  {
    id: "T-001",
    aeronave: "Boeing 737",
    tipo: "Segurança",
    resultado: "Aprovado",
  },
  { id: "T-002", aeronave: "Airbus A320", tipo: "Motor", resultado: "Falha" },
  {
    id: "T-003",
    aeronave: "Embraer 195",
    tipo: "Sistemas",
    resultado: "Pendente",
  },
];

function Testes() {
  return (
    <div className={styles.pageStyle}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Testes de Qualidade</h1>
          <Link to="/montagem" className={styles.my_link}>
            Voltar
          </Link>
          <Link to="/novo-teste" className={styles.my_link}>
            + Adicionar Teste
          </Link>
        </header>

        <div className={styles.gridTestes}>
          {listaTestes.map((teste) => (
            <div key={teste.id} className={styles.cardTeste}>
              <h3>{teste.aeronave}</h3>
              <p>
                <strong>ID:</strong> {teste.id}
              </p>
              <p>
                <strong>Tipo:</strong> {teste.tipo}
              </p>
              <span className={`${styles.status} ${styles[teste.resultado]}`}>
                {teste.resultado}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testes;
