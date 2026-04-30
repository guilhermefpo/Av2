import React from "react";
import styles from "./Funcionarios.module.css";
import { Link, useNavigate } from "react-router-dom";

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
    cargo: "Engenheiro",
    setor: "Montagem",
    status: "Ativo",
  },
  {
    id: 102,
    nome: "Ana Martins",
    cargo: "Operador",
    setor: "Testes",
    status: "Ativo",
  },
  {
    id: 103,
    nome: "Ricardo Souza",
    cargo: "ADM",
    setor: "Segurança",
    status: "Em Férias",
  },
  {
    id: 104,
    nome: "Beatriz Lima",
    cargo: "Engenheiro",
    setor: "Manutenção",
    status: "Ativo",
  },
];

function Funcionarios() {
  const navigate = useNavigate();


  const cargoUsuario = localStorage.getItem("@Aerocode:cargo") || "Operador";
  const eAdmin = cargoUsuario === "ADM";

  const handleEdit = (id: number) => navigate(`/editar-funcionario/${id}`);

  const handleDelete = (nome: string) => {
    if (window.confirm(`Excluir ${nome}?`)) alert("Removido!");
  };

  const handleLogout = () => {
    localStorage.removeItem("@Aerocode:cargo");
    navigate("/");
  };

  return (
    <div className={styles.pageStyle}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Quadro de Funcionários</h1>
          <div className={styles.headerBtns}>
            <button onClick={handleLogout} className={styles.btnSair}>
              Sair
            </button>
            {eAdmin && (
              <Link to="/novo-funcionario" className={styles.my_link_add}>
                + Novo
              </Link>
            )}
          </div>
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

              <div className={styles.acoes}>
                <div className={styles.statusBadge}>
                  <span
                    className={`${styles.dot} ${styles[f.status.replace(" ", "")]}`}
                  ></span>
                  {f.status}
                </div>

                <div className={styles.btnGroup}>
                  {eAdmin ? (
                    <>
                      <button
                        className={styles.btnEditar}
                        onClick={() => handleEdit(f.id)}
                      >
                        Editar
                      </button>
                      <button
                        className={styles.btnDeletar}
                        onClick={() => handleDelete(f.nome)}
                      >
                        Excluir
                      </button>
                    </>
                  ) : (
                    <span className={styles.tagLock}>🔒 Apenas Leitura</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Funcionarios;
