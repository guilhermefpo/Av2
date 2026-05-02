import React, { useState, useEffect } from "react";
import styles from "./Pecas.module.css";
import { Link } from "react-router-dom";
import { Peca } from "../index";

const Pecas: React.FC = () => {
  const [estoque, setEstoque] = useState<Peca[]>([]);

  useEffect(() => {
    const salvo = localStorage.getItem("@Aerocode:estoque_pecas");
    if (salvo) {
      setEstoque(JSON.parse(salvo));
    } else {
      const inicial: Peca[] = [
        {
          id: 1,
          nome: "Turbina Turbofan",
          quantidade: 4,
          status: "Em estoque",
        },
        { id: 2, nome: "Painel Aviônico", quantidade: 0, status: "Esgotado" },
      ];
      setEstoque(inicial);
      localStorage.setItem("@Aerocode:estoque_pecas", JSON.stringify(inicial));
    }
  }, []);

  const handleDeletar = (id: number) => {
    if (window.confirm("Remover esta peça do inventário?")) {
      const novo = estoque.filter((p) => p.id !== id);
      setEstoque(novo);
      localStorage.setItem("@Aerocode:estoque_pecas", JSON.stringify(novo));
    }
  };

  return (
    <div className={styles.pageStyle}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>📦 Inventário de Peças</h1>
          <div className={styles.btns}>
            <Link to="/montagem" className={styles.my_link}>
              Voltar
            </Link>
            <Link to="/nova-peca" className={styles.my_link_add}>
              + Adicionar
            </Link>
          </div>
        </header>

        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome da Peça</th>
              <th>Qtd.</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {estoque.map((peca) => (
              <tr key={peca.id}>
                <td>#{peca.id}</td>
                <td>{peca.nome}</td>
                <td>{peca.quantidade}</td>
                <td className={styles[peca.status.replace(/\s/g, "")]}>
                  {peca.status}
                </td>
                <td>
                  <button
                    onClick={() => handleDeletar(peca.id)}
                    className={styles.btnDeletar}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pecas;
