import React, { useState, useEffect } from "react";
import styles from "./Pecas.module.css";
import { Link, useNavigate } from "react-router-dom";
import { StatusPeca, type Peca, type Aeronave } from "../index";

const Pecas: React.FC = () => {
  const [estoque, setEstoque] = useState<Peca[]>([]);
  const navigate = useNavigate();

  const carregarEstoque = () => {
    const salvo = localStorage.getItem("@Aerocode:pecas");
    if (salvo) setEstoque(JSON.parse(salvo));
  };

  useEffect(() => {
    carregarEstoque();
  }, []);

  const salvarNoLocalStorage = (novoEstoque: Peca[]) => {
    localStorage.setItem("@Aerocode:pecas", JSON.stringify(novoEstoque));
    setEstoque(novoEstoque);
  };

  const adicionarPecaNaAeronave = (pecaSelecionada: Peca) => {
    const idAviao = localStorage.getItem("@Aerocode:aviao_selecionado");

    if (!idAviao) {
      alert(
        "Nenhuma aeronave selecionada! Redirecionando para o Painel de Gestão...",
      );
      navigate("/gestao");
      return;
    }

    const avioes: Aeronave[] = JSON.parse(
      localStorage.getItem("@Aerocode:aeronaves") || "[]",
    );

    const novaListaAvioes = avioes.map((aviao) => {
      if (aviao.codigo === idAviao) {
        const pecasAtuais = aviao.pecas || [];
        const jaExiste = pecasAtuais.find((p) => p.id === pecaSelecionada.id);

        if (jaExiste) {
          alert("Esta peça já consta no relatório desta aeronave.");
          return aviao;
        }

        alert(
          `Sucesso: ${pecaSelecionada.nome} instalada na aeronave ${aviao.modelo}.`,
        );

        return {
          ...aviao,
          pecas: [
            ...pecasAtuais,
            { ...pecaSelecionada, status: "Instalada" as any },
          ],
        };
      }
      return aviao;
    });

    localStorage.setItem(
      "@Aerocode:aeronaves",
      JSON.stringify(novaListaAvioes),
    );
    navigate("/gestao");
  };

  // FUNÇÃO DE EDITAR
  const editarPeca = (peca: Peca) => {
    const novoNome = prompt("Editar nome da peça:", peca.nome);
    const novaQtd = prompt(
      "Editar quantidade em estoque:",
      String(peca.quantidade),
    );

    if (novoNome !== null && novaQtd !== null) {
      const novoEstoque = estoque.map((p) =>
        p.id === peca.id
          ? { ...p, nome: novoNome, quantidade: Number(novaQtd), status: n }
          : p,
      );
      salvarNoLocalStorage(novoEstoque);
    }
  };

  // FUNÇÃO DE EXCLUIR
  const excluirPeca = (id: number | string) => {
    if (
      window.confirm(
        "Tem certeza que deseja remover esta peça do estoque geral?",
      )
    ) {
      const novoEstoque = estoque.filter((p) => p.id !== id);
      salvarNoLocalStorage(novoEstoque);
    }
  };

  return (
    <div className={styles.pageStyle}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>📦 Inventário de Peças</h1>
          <div className={styles.btns}>
            <Link to="/gestao" className={styles.my_link}>
              Voltar ao Painel
            </Link>
            <Link to="/nova-peca" className={styles.my_link_add}>
              + Nova Peça
            </Link>
          </div>
        </header>

        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Cód.</th>
              <th>Nome da Peça</th>
              <th>Qtd.</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {estoque.map((peca) => (
              <tr key={peca.id}>
                <td>
                  <strong>#{peca.id}</strong>
                </td>
                <td>{peca.nome}</td>
                <td>{peca.quantidade} un.</td>
                <td>
                  <span
                    className={`${styles.statusLabel} ${styles[peca.status?.toLowerCase().replace(/\s/g, "")] || ""}`}
                  >
                    {peca.status}
                  </span>
                </td>
                <td className={styles.acoes}>
                  <button
                    onClick={() => adicionarPecaNaAeronave(peca)}
                    className={styles.btnVincular}
                    title="Instalar na aeronave selecionada"
                  >
                    Instalar
                  </button>
                  <button
                    onClick={() => editarPeca(peca)}
                    className={styles.btnEditar}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => excluirPeca(peca.id)}
                    className={styles.btnDeletar}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {estoque.length === 0 && (
          <p className={styles.empty}>
            Nenhuma peça cadastrada no estoque geral.
          </p>
        )}
      </div>
    </div>
  );
};

export default Pecas;
