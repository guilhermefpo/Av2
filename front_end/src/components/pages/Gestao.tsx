import React from "react";
import { TabelaAvioes } from "../layout/TabelaAvioes";
import Controle from "./Controle";
import { Aeronave } from "../index";
import { Funcionario } from "../index";
import styles from "./Gestao.module.css";

const Gestao: React.FC = () => {
  const exportarRelatorioFinal = () => {
    const avioes: Aeronave[] = JSON.parse(
      localStorage.getItem("@Aerocode:avioes_db") || "[]",
    );

    if (avioes.length === 0) {
      alert("Nenhuma aeronave encontrada para gerar relatório.");
      return;
    }

    const aviao = avioes[0];

    let conteudo = "AEROCODE - RELATÓRIO DE CONFORMIDADE TÉCNICA\n";
    conteudo += "==============================================\n";
    conteudo += `AERONAVE: ${aviao.modelo} (${aviao.codigo})\n`;
    conteudo += `TIPO: ${aviao.tipo} | CAPACIDADE: ${aviao.capacidade} PAX\n`;
    conteudo += `DATA: ${new Date().toLocaleString()}\n`;
    conteudo += "----------------------------------------------\n\n";

    conteudo += "STATUS DA LINHA DE MONTAGEM:\n";
    aviao.etapas.forEach((e) => {
      conteudo += `[${e.status.padEnd(10)}] - ${e.nome}\n`;
    });

    conteudo += "\nINSPEÇÃO DE COMPONENTES (PEÇAS):\n";
    if (aviao.pecas.length === 0) conteudo += "Nenhuma peça registrada.\n";
    aviao.pecas.forEach((p) => {
      conteudo += `- ${p.nome} (${p.tipo}) | Fornecedor: ${p.fornecedor}\n`;
    });

    conteudo += "\n==============================================\n";
    conteudo += "Certificado de acordo com as normas RBAC/ANAC.";

    const blob = new Blob([conteudo], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Relatorio_${aviao.codigo}.txt`;
    link.click();
  };

  return (
    <div className={styles.pageStyle}>
      <div className={styles.content}>
        <div className={styles.actions}>
          <button
            onClick={exportarRelatorioFinal}
            className={styles.btnRelatorio}
          >
            📄 Exportar Relatório ASCII (.txt)
          </button>
        </div>
        <TabelaAvioes />

        <Controle />
      </div>
    </div>
  );
};

export default Gestao;
