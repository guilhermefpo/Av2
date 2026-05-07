import { useEffect, useState } from "react";
import { type Aeronave, TipoAeronave } from "../index";
import { api } from "../../services/api";
import styles from "./TabelaAvioes.module.css";

export function TabelaAvioes() {
  const [avioes, setAvioes] = useState<Aeronave[]>([]);

  const carregarDados = () => {
    const dados = api.getAeronaves();
    setAvioes(dados);
  };

  useEffect(() => {
    carregarDados();
    window.addEventListener("storage", carregarDados);
    return () => window.removeEventListener("storage", carregarDados);
  }, []);

  const selecionarAviao = (codigo: string) => {
    localStorage.setItem("@Aerocode:aviao_selecionado", codigo);
    window.dispatchEvent(new Event("storage"));
    alert(`Aeronave ${codigo} selecionada para monitoramento.`);
  };

  // FUNÇÃO EXCLUIR
  const excluirAviao = (e: React.MouseEvent, codigo: string) => {
    e.stopPropagation(); // Impede de selecionar a linha ao clicar em excluir
    if (
      window.confirm(
        `Deseja realmente remover a aeronave ${codigo} do sistema?`,
      )
    ) {
      const novosAvioes = avioes.filter((a) => a.codigo !== codigo);
      localStorage.setItem("@Aerocode:aeronaves", JSON.stringify(novosAvioes));

      // Se o avião excluído era o selecionado, limpa a seleção
      if (localStorage.getItem("@Aerocode:aviao_selecionado") === codigo) {
        localStorage.removeItem("@Aerocode:aviao_selecionado");
      }

      carregarDados();
      window.dispatchEvent(new Event("storage"));
    }
  };

  const editarAviao = (e: React.MouseEvent, aviao: Aeronave) => {
    e.stopPropagation();

    const novoModelo = prompt(
      `Editar Modelo para ${aviao.codigo}:`,
      aviao.modelo,
    );
    const novoCliente = prompt(
      `Editar Cliente para ${aviao.codigo}:`,
      aviao.cliente || "",
    );

    if (novoModelo !== null && novoCliente !== null) {
      // 1. Criamos um novo array mapeado (imutabilidade)
      const novosAvioes = avioes.map((a) => {
        if (a.codigo === aviao.codigo) {
          return { ...a, modelo: novoModelo, cliente: novoCliente };
        }
        return a;
      });

      // 2. Atualizamos o LocalStorage
      localStorage.setItem("@Aerocode:aeronaves", JSON.stringify(novosAvioes));

      // 3. CRUCIAL: Atualizamos o estado local para o React refletir no HTML na hora
      setAvioes(novosAvioes);

      // 4. Avisamos outros componentes (como o Controle.tsx) que os dados mudaram
      window.dispatchEvent(new Event("storage"));

      alert("Dados atualizados com sucesso!");
    }
  };
  return (
    <div className={styles.container}>
      <h3 className={styles.titleTable}>Frota Aerocode</h3>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Modelo / Cliente</th>
            <th>Tipo</th>
            <th>Capacidade</th>
            <th>Status Geral</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {avioes.map((aviao) => (
            <tr
              key={aviao.codigo}
              onClick={() => selecionarAviao(aviao.codigo)}
              className={styles.linhaInterativa}
            >
              <td>
                <strong>{aviao.codigo}</strong>
              </td>
              <td>
                <div className={styles.infoCelular}>
                  <span>{aviao.modelo}</span>
                  <small className={styles.clienteTxt}>{aviao.cliente}</small>
                </div>
              </td>
              <td>
                <span
                  className={`${styles.badge} ${aviao.tipo === TipoAeronave.MILITAR ? styles.militar : styles.comercial}`}
                >
                  {aviao.tipo}
                </span>
              </td>
              <td>{aviao.capacidade} pax</td>
              <td>
                {aviao.etapas.every((e) => e.status === "Concluída")
                  ? ` Pronto (${aviao.dataEntrega})`
                  : " Em Produção"}
              </td>
              <td className={styles.acoes}>
                <button
                  onClick={(e) => editarAviao(e, aviao)}
                  className={styles.btnEditar}
                  title="Editar informações"
                >
                  ✏️
                </button>
                <button
                  onClick={(e) => excluirAviao(e, aviao.codigo)}
                  className={styles.btnExcluir}
                  title="Excluir aeronave"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {avioes.length === 0 && (
        <p className={styles.empty}>Aguardando registro de novas aeronaves.</p>
      )}
    </div>
  );
}
