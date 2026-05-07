import React, { useState, useEffect } from "react";
import { type Aeronave, StatusEtapa, NivelPermissao } from "../index";
import { api } from "../../services/api";
import styles from "./Controle.module.css";

const Controle: React.FC = () => {
  const [avioes, setAvioes] = useState<Aeronave[]>([]);
  const [codigoAtivo, setCodigoAtivo] = useState<string | null>(null);

  const userJson = localStorage.getItem("@Aerocode:usuario_logado");
  const usuarioLogado = userJson ? JSON.parse(userJson) : null;

  const temPermissao =
    usuarioLogado?.nivelPermissao === NivelPermissao.ADMINISTRADOR ||
    usuarioLogado?.nivelPermissao === NivelPermissao.ENGENHEIRO;

  const carregarDados = () => {
    setAvioes(api.getAeronaves());
    setCodigoAtivo(localStorage.getItem("@Aerocode:aviao_selecionado"));
  };

  useEffect(() => {
    carregarDados();
    window.addEventListener("storage", carregarDados);
    return () => window.removeEventListener("storage", carregarDados);
  }, []);

  const atualizarEtapa = (
    aviaoCodigo: string,
    ordemEtapa: number,
    novosDados: { nome?: string; status?: StatusEtapa },
  ) => {
    try {
      const todasAeronaves = api.getAeronaves();
      const novasAeronaves = todasAeronaves.map((aviao) => {
        if (aviao.codigo === aviaoCodigo) {
          const etapasAtualizadas = aviao.etapas.map((et) => {
            if (et.ordem === ordemEtapa) {
              return { ...et, ...novosDados };
            }
            return et;
          });
          return { ...aviao, etapas: etapasAtualizadas };
        }
        return aviao;
      });

      localStorage.setItem(
        "@Aerocode:aeronaves",
        JSON.stringify(novasAeronaves),
      );
      carregarDados();
      window.dispatchEvent(new Event("storage"));
    } catch (error: any) {
      alert("Erro ao atualizar etapa: " + error.message);
    }
  };

  const aviaoAtivo = avioes.find((a) => a.codigo === codigoAtivo);

  if (!aviaoAtivo) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyMsg}>
          Selecione uma aeronave na tabela acima para gerenciar a produção.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.headerControle}>
        <h2 className={styles.title}>
          ⚙️ Painel de Engenharia:{" "}
          <span className={styles.codigo}>{aviaoAtivo.codigo}</span>
        </h2>
        <span className={styles.modelo}>{aviaoAtivo.modelo}</span>
      </header>

      <div className={styles.gridEtapas}>
        {aviaoAtivo.etapas.map((etapa) => (
          <div
            key={etapa.ordem}
            className={`${styles.cardEtapa} ${styles[etapa.status.replace(/\s+/g, "").toLowerCase()]}`}
          >
            <div className={styles.info}>
              <span className={styles.ordem}>{etapa.ordem}º Etapa</span>

              {/* INPUT PARA EDITAR O NOME DA ETAPA */}
              <input
                type="text"
                className={styles.inputNomeEtapa}
                value={etapa.nome}
                disabled={!temPermissao}
                onChange={(e) =>
                  atualizarEtapa(aviaoAtivo.codigo, etapa.ordem, {
                    nome: e.target.value,
                  })
                }
                placeholder="Nome da etapa..."
              />

              <div className={styles.statusBadge}>{etapa.status}</div>
            </div>

            <select
              value={etapa.status}
              disabled={!temPermissao}
              onChange={(e) =>
                atualizarEtapa(aviaoAtivo.codigo, etapa.ordem, {
                  status: e.target.value as StatusEtapa,
                })
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
