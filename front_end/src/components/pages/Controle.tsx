import React, { useState, useEffect } from "react";
import StatusEtapa from "../types/StatusEtapa";
import styles from "./Controle.module.css";

const Controle: React.FC = () => {
  const [etapaAtual, setEtapaAtual] = useState<StatusEtapa>(() => {
    const salvo = localStorage.getItem("@Aerocode:etapaProjeto");
    return (salvo as StatusEtapa) || StatusEtapa.PENDENTE;
  });

  const cargo = localStorage.getItem("@Aerocode:cargo") || "Operador";
  const eAdmin = cargo === "ADM";

  const alterarEtapa = (novaEtapa: StatusEtapa) => {
    setEtapaAtual(novaEtapa);
    localStorage.setItem("@Aerocode:etapaProjeto", novaEtapa);
  };

  const getSinalizacao = (status: StatusEtapa) => {
    switch (status) {
      case StatusEtapa.PENDENTE:
        return { cor: "#888", icon: "⏳", texto: "Aguardando Início" };
      case StatusEtapa.DISPONIVEL:
        return { cor: "#17a2b8", icon: "📦", texto: "Peças Prontas" };
      case StatusEtapa.ANDAMENTO:
        return { cor: "#ffc107", icon: "🛠️", texto: "Em Montagem" };
      case StatusEtapa.EMUSO:
        return { cor: "#007bff", icon: "✈️", texto: "Sistemas em Teste" };
      case StatusEtapa.DANIFICADA:
        return { cor: "#dc3545", icon: "⚠️", texto: "Falha Detectada" };
      case StatusEtapa.CONCLUIDA:
        return { cor: "#28a745", icon: "✅", texto: "Pronto para Voo" };
      default:
        return { cor: "#333", icon: "❓", texto: "Desconhecido" };
    }
  };

  const sinal = getSinalizacao(etapaAtual);

  return (
    <div className={styles.pageMontagem}>
      <header className={styles.header}>
        <h2 className={styles.titleSecundario}>
          Monitoramento de Ciclo de Vida
        </h2>
        <div
          className={styles.statusBanner}
          style={{ backgroundColor: sinal.cor }}
        >
          <span className={styles.icon}>{sinal.icon}</span>
          <div>
            <strong>Etapa Atual: {etapaAtual}</strong>
            <p>{sinal.texto}</p>
          </div>
        </div>
      </header>

      <main className={styles.content}>
        <section className={styles.cardInfo}>
          <h3>Controle de Fluxo</h3>
          <p>Selecione a etapa para atualizar o status da aeronave:</p>

          <div className={styles.controles}>
            <select
              value={etapaAtual}
              onChange={(e) => alterarEtapa(e.target.value as StatusEtapa)}
              className={styles.selectStatus}
              disabled={!eAdmin}
            >
              {Object.values(StatusEtapa).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {!eAdmin && (
              <small className={styles.aviso}>
                🔒 Perfil <strong>{cargo}</strong>: apenas visualização
                permitida.
              </small>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Controle;
