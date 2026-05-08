import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { NivelPermissao, type Funcionario } from "../index";
import styles from "./Funcionarios.module.css";

function Funcionarios() {
  const navigate = useNavigate();
  const [equipe, setEquipe] = useState<Funcionario[]>([]);

  const userJson = localStorage.getItem("@Aerocode:usuario_logado");
  const usuarioLogado: Funcionario | null = userJson
    ? JSON.parse(userJson)
    : null;
  const eAdmin = usuarioLogado?.nivelPermissao === NivelPermissao.ADMINISTRADOR;

  useEffect(() => {
    const dados = api.getFuncionarios();
    setEquipe(dados);
  }, []);

  const handleEdit = (id: string) => navigate(`/editar-funcionario/${id}`);

  const handleDelete = (id: string, nome: string) => {
    if (id === usuarioLogado?.id) {
      alert(
        "Operação Negada: Você não pode remover sua própria conta do sistema.",
      );
      return;
    }

    if (
      window.confirm(
        `Tem certeza que deseja remover ${nome} do quadro técnico?`,
      )
    ) {
      const novaLista = equipe.filter((f) => f.id !== id);
      setEquipe(novaLista);
      localStorage.setItem("@Aerocode:funcionarios", JSON.stringify(novaLista));
      alert("Funcionário removido com sucesso!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("@Aerocode:usuario_logado");
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
                + Novo Colaborador
              </Link>
            )}
          </div>
        </header>

        <div className={styles.listaFuncionarios}>
          {equipe.map((f) => (
            <div key={f.id} className={styles.itemFuncionario}>
              <div className={styles.info}>
                <strong>
                  {f.nome} {f.id === usuarioLogado?.id && "(Você)"}
                </strong>
                <span>{f.nivelPermissao}</span>
              </div>

              <div className={styles.acoes}>
                <div className={styles.statusBadge}>
                  <span className={styles.dot}></span>
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

                      {f.id !== usuarioLogado?.id && (
                        <button
                          className={styles.btnDeletar}
                          onClick={() => handleDelete(f.id, f.nome)}
                        >
                          Excluir
                        </button>
                      )}
                    </>
                  ) : (
                    <span className={styles.tagLock}>🔒 Apenas Leitura</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {equipe.length === 0 && (
            <p className={styles.empty}>
              Nenhum funcionário cadastrado no sistema.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Funcionarios;
