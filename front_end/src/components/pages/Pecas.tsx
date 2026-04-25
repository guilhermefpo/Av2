import React from "react";
import styles from "./Pecas.module.css";
import { Link } from "react-router-dom";

interface Peca {
  id: number;
  nome: string;
  quantidade: number;
  status: "Em estoque" | "Esgotado" | "Pedido solicitado";
}

const estoque: Peca[] = [
  { id: 1, nome: "Turbina Turbofan", quantidade: 4, status: "Em estoque" },
  { id: 2, nome: "Flaps de Asa", quantidade: 12, status: "Em estoque" },
  { id: 3, nome: "Painel Aviônico", quantidade: 0, status: "Esgotado" },
  { id: 4, nome: "Rebite de Titânio", quantidade: 500, status: "Em estoque" },
];

function Pecas() {
  return (
    <div className={styles.pageStyle}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Inventário de Peças</h1>
          <Link to="/montagem" className={styles.my_link}>
            Voltar para Montagem
          </Link>
          <Link to="/nova-peca" className={styles.my_link}>
            + Adicionar Peça
          </Link>
        </header>

        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome da Peça</th>
              <th>Qtd.</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {estoque.map((peca) => (
              <tr key={peca.id}>
                <td>{peca.id}</td>
                <td>{peca.nome}</td>
                <td>{peca.quantidade}</td>
                <td className={styles[peca.status.replace(/\s/g, "")]}>
                  {peca.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pecas;
