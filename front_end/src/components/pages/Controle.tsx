import React, { useState, useEffect } from "react";
import type { StatusEtapa, NivelPermissao, Aeronave } from "../index";
import styles from "./Controle.module.css";

const Controle: React.FC = () => {
  const [avioes, setAvioes] = useState<Aeronave[]>([]);

  const cargo = localStorage.getItem("@Aerocode:cargo") as NivelPermissao;
  const eAdmin = cargo === NivelPermissao.ADMINISTRADOR;

  useEffect(() => {
    const dados = localStorage.getItem("@Aerocode:avioes_db");
    if (dados) setAvioes(JSON.parse(dados));
  }, []);

  const alterarStatusEtapa = (
    aviaoCodigo: string,
    ordemEtapa: number,
    novoStatus: StatusEtapa,
  ) => {
    const novasAeronaves = [...avioes];
    const aviaoIndex = novasAeronaves.findIndex(
      (a) => a.codigo === aviaoCodigo,
    );
    const etapaIndex = novasAeronaves[aviaoIndex].etapas.findIndex(
      (e) => e.ordem === ordemEtapa,
    );

    if (novoStatus === StatusEtapa.CONCLUIDA && etapaIndex > 0) {
      if (
        novasAeronaves[aviaoIndex].etapas[etapaIndex - 1].status !==
        StatusEtapa.CONCLUIDA
      ) {
        alert(`BLOQUEIO: A etapa anterior precisa ser CONCLUÍDA primeiro.`);
        return;
      }
    }

    novasAeronaves[aviaoIndex].etapas[etapaIndex].status = novoStatus;
    setAvioes(novasAeronaves);
    localStorage.setItem("@Aerocode:avioes_db", JSON.stringify(novasAeronaves));
  };

  if (avioes.length === 0) return null;

  const aviaoAtivo = avioes[0];
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Linha de Produção: {aviaoAtivo.codigo}</h2>
      <div className={styles.gridEtapas}>
        {aviaoAtivo.etapas.map((etapa) => (
          <div
            key={etapa.ordem}
            className={`${styles.cardEtapa} ${styles[etapa.status.toLowerCase()]}`}
          >
            <div className={styles.info}>
              <span>
                {etapa.ordem}. {etapa.nome}
              </span>
              <strong>{etapa.status}</strong>
            </div>

            <select
              value={etapa.status}
              disabled={!eAdmin}
              onChange={(e) =>
                alterarStatusEtapa(
                  aviaoAtivo.codigo,
                  etapa.ordem,
                  e.target.value as StatusEtapa,
                )
              }
              className={styles.select}
            >
              {Object.values(StatusEtapa).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Controle;
