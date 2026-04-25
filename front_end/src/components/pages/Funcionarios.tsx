import React from "react";
import styles from "./Funcionarios.module.css";
import { Link } from "react-router-dom";

interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
  setor: string;
  status: "Ativo" | "Em Férias" | "Licença";
}

const equipe: Funcionario[] = [
  {
    id: 101,
    nome: "Carlos Andrade",
    cargo: "Engenheiro Aeronáutico",
    setor: "Montagem",
    status: "Ativo",
  },
  {
    id: 102,
    nome: "Ana Martins",
    cargo: "Técnica de Sistemas",
    setor: "Testes",
    status: "Ativo",
  },
  {
    id: 103,
    nome: "Ricardo Souza",
    cargo: "Inspetor de Qualidade",
    setor: "Segurança",
    status: "Em Férias",
  },
  {
    id: 104,
    nome: "Beatriz Lima",
    cargo: "Mecânica de Fuselagem",
    setor: "Manutenção",
    status: "Ativo",
  },
];

function Funcionarios() {
  return (
    <div className={styles.pageStyle}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Quadro de Funcionários</h1>
          <Link to="/montagem" className={styles.my_link}>
            Voltar
          </Link>
          <Link to="/novo-funcionario" className={styles.my_link}>
            + Adicionar Funcionário
          </Link>
        </header>

        <div className={styles.listaFuncionarios}>
          {equipe.map((f) => (
            <div key={f.id} className={styles.itemFuncionario}>
              <div className={styles.info}>
                <strong>{f.nome}</strong>
                <span>
                  {f.cargo} | {f.setor}
                </span>
              </div>
              <div className={styles.statusBadge}>
                <span
                  className={`${styles.dot} ${styles[f.status.replace(" ", "")]}`}
                ></span>
                {f.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Funcionarios;
