import React from "react";
import { TabelaAvioes } from "../layout/TabelaAvioes";
import Controle from "./Controle";
import { api } from "../../services/api";
import styles from "./Gestao.module.css";

const Gestao: React.FC = () => {
  const exportarRelatorioFinal = () => {
    const codigoSelecionado = localStorage.getItem(
      "@Aerocode:aviao_selecionado",
    );

    if (!codigoSelecionado) {
      alert(
        "Por favor, selecione uma aeronave na tabela primeiro clicando sobre ela.",
      );
      return;
    }

    const avioes = api.getAeronaves();
    const aviao = avioes.find((a) => a.codigo === codigoSelecionado);

    if (!aviao) {
      alert("Erro ao localizar os dados da aeronave selecionada.");
      return;
    }

    const estaConcluido = aviao.etapas.every((e) => e.status === "Concluída");
    if (!estaConcluido) {
      const confirmar = window.confirm(
        "Atenção: Esta aeronave ainda possui etapas pendentes. Deseja exportar o relatório de conformidade parcial?",
      );
      if (!confirmar) return;
    }

    let conteudo = "AEROCODE - RELATÓRIO DE CONFORMIDADE TÉCNICA\n";
    conteudo += "==============================================\n";
    conteudo += `AERONAVE: ${aviao.modelo.toUpperCase()} (${aviao.codigo})\n`;
    conteudo += `TIPO: ${aviao.tipo} | CAPACIDADE: ${aviao.capacidade} PAX\n`;

    conteudo += `CLIENTE: ${aviao.cliente || "Não informado"}\n`;
    conteudo += `PRAZO DE ENTREGA: ${aviao.dataEntrega || "Não definido"}\n`;

    conteudo += `DATA DE EMISSÃO: ${new Date().toLocaleString()}\n`;
    conteudo += "----------------------------------------------\n\n";

    conteudo += "STATUS DA LINHA DE MONTAGEM:\n";
    aviao.etapas.forEach((e) => {
      conteudo += `[${e.status.padEnd(12)}] - ${e.nome}\n`;
    });

    conteudo += "\nINSPEÇÃO DE COMPONENTES (PEÇAS INSTALADAS):\n";

    const pecasInstaladas = aviao.pecas || [];
    if (pecasInstaladas.length === 0) {
      conteudo += "Nenhuma peça registrada no inventário desta aeronave.\n";
    } else {
      pecasInstaladas.forEach((p) => {
        conteudo += `- ${p.nome.padEnd(20)} | Tipo: ${p.tipo.padEnd(10)} | Fornecedor: ${p.fornecedor}\n`;
      });
    }

    conteudo += "\n==============================================\n";
    conteudo += "Certificado de acordo com as normas RBAC/ANAC.\n";

    const usuarioLogado = JSON.parse(
      localStorage.getItem("@Aerocode:usuario_logado") || "{}",
    );
    conteudo += `Responsável Técnico: ${usuarioLogado.nome || "Sistema"}\n`;
    conteudo += `Nível de Acesso: ${usuarioLogado.nivelPermissao || "N/A"}\n`;

    const blob = new Blob([conteudo], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Relatorio_Tecnico_${aviao.codigo}.txt`;
    link.click();
  };

  return (
    <div className={styles.pageStyle}>
      <div className={styles.content}>
        <div className={styles.actions}>
          <h2 className={styles.sectionTitle}>
            Painel de Controle de Produção
          </h2>
          <button
            onClick={exportarRelatorioFinal}
            className={styles.btnRelatorio}
            title="Gera o documento oficial de entrega"
          >
            📄 Exportar Relatório de Conformidade (.txt)
          </button>
        </div>

        <TabelaAvioes />

        <Controle />
      </div>
    </div>
  );
};

export default Gestao;
