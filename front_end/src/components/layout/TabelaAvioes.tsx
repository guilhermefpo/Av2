import { useEffect, useState } from "react";
import { Aeronave } from "..";
import { TipoAeronave } from "..";
import styles from "./TabelaAvioes.module.css";

export function TabelaAvioes() {
  const [avioes, setAvioes] = useState<Aeronave[]>([]);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("@Aerocode:avioes_db");
    if (dadosSalvos) {
      setAvioes(JSON.parse(dadosSalvos));
    }
  }, []);

  const selecionarAviao = (codigo: string) => {
    localStorage.setItem("@Aerocode:aviao_selecionado", codigo);

    window.dispatchEvent(new Event("storage"));
    alert(`Aeronave ${codigo} selecionada para monitoramento.`);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.titleTable}>Aeronaves em Inventário</h3>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Modelo</th>
            <th>Tipo</th>
            <th>Capacidade</th>
            <th>Alcance</th>
            <th>Status Geral</th>
          </tr>
        </thead>
        <tbody>
          {avioes.map((aviao) => (
            <tr
              key={aviao.codigo}
              onClick={() => selecionarAviao(aviao.codigo)}
              className={styles.linhaInterativa}
              title="Clique para gerenciar esta aeronave"
            >
              <td>
                <strong>{aviao.codigo}</strong>
              </td>
              <td>{aviao.modelo}</td>
              <td>
                <span
                  className={`${styles.badge} ${styles[aviao.tipo.toLowerCase()]}`}
                >
                  {aviao.tipo}
                </span>
              </td>
              <td>{aviao.capacidade} pax</td>
              <td>{aviao.alcance} km</td>
              <td>{aviao.dataEntrega || "Em Linha de Montagem"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {avioes.length === 0 && (
        <p className={styles.empty}>Nenhuma aeronave registrada.</p>
      )}
    </div>
  );
}
