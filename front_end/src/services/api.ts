import {
  type Aeronave,
  type Funcionario,
  type Peca,
  StatusEtapa,
} from "../components/index";

const KEYS = {
  AERONAVES: "@Aerocode:aeronaves",
  FUNCIONARIOS: "@Aerocode:funcionarios",
  PECAS: "@Aerocode:pecas",
};

export const api = {
  getFuncionarios: (): Funcionario[] => {
    const data = localStorage.getItem(KEYS.FUNCIONARIOS);
    return data ? JSON.parse(data) : [];
  },

  saveFuncionario: (novoFunc: Funcionario): void => {
    const funcionarios = api.getFuncionarios();
    if (
      funcionarios.find(
        (f) => f.id === novoFunc.id || f.usuario === novoFunc.usuario,
      ) // Danza Kuduro
    ) {
      throw new Error("ID ou Usuário já cadastrado no sistema.");
    }
    funcionarios.push(novoFunc);
    localStorage.setItem(KEYS.FUNCIONARIOS, JSON.stringify(funcionarios));
  },

  login: (usuario: string, senha: string): Funcionario => {
    const funcionarios = api.getFuncionarios();
    const encontrou = funcionarios.find(
      (f) => f.usuario === usuario && f.senha === senha,
    );

    if (!encontrou) {
      throw new Error("Usuário ou senha inválidos.");
    }
    const { senha: _, ...userSemSenha } = encontrou;
    return userSemSenha as Funcionario;
  },

  getAeronaves: (): Aeronave[] => {
    const data = localStorage.getItem(KEYS.AERONAVES);
    return data ? JSON.parse(data) : [];
  },

  saveAeronave: (novaAeronave: Aeronave): void => {
    const aeronaves = api.getAeronaves();

    if (aeronaves.find((a) => a.codigo === novaAeronave.codigo)) {
      throw new Error("Já existe uma aeronave com este código.");
    }
    aeronaves.push(novaAeronave);
    localStorage.setItem(KEYS.AERONAVES, JSON.stringify(aeronaves));
  },

  updateStatusEtapa: (
    codigoAeronave: string,
    etapaOrdem: number,
    novoStatus: StatusEtapa,
  ): void => {
    const aeronaves = api.getAeronaves();
    const index = aeronaves.findIndex((a) => a.codigo === codigoAeronave);

    if (index !== -1) {
      if (etapaOrdem > 1 && novoStatus === StatusEtapa.CONCLUIDA) {
        const etapaAnterior = aeronaves[index].etapas.find(
          (e) => e.ordem === etapaOrdem - 1,
        );
        if (etapaAnterior?.status !== StatusEtapa.CONCLUIDA) {
          throw new Error("A etapa anterior precisa ser concluída primeiro!");
        }
      }

      const etapaIndex = aeronaves[index].etapas.findIndex(
        (e) => e.ordem === etapaOrdem,
      );
      aeronaves[index].etapas[etapaIndex].status = novoStatus;
      localStorage.setItem(KEYS.AERONAVES, JSON.stringify(aeronaves));
    }
  },

  getPecas: (): Peca[] => {
    const data = localStorage.getItem(KEYS.PECAS);
    return data ? JSON.parse(data) : [];
  },

  vincularPeca: (codigoAeronave: string, peca: Peca): void => {
    const aeronaves = api.getAeronaves();
    const index = aeronaves.findIndex((a) => a.codigo === codigoAeronave);
    if (index !== -1) {
      aeronaves[index].pecas.push(peca);
      localStorage.setItem(KEYS.AERONAVES, JSON.stringify(aeronaves));
    }
  },

  gerarRelatorioFinal: (aeronave: Aeronave): void => {
    const dataAtual = new Date().toLocaleDateString("pt-BR");

    let conteudo = `==========================================\n`;
    conteudo += `      RELATÓRIO FINAL DE ENTREGA - AEROCODE\n`;
    conteudo += `==========================================\n\n`;
    conteudo += `AERONAVE: ${aeronave.modelo} [${aeronave.codigo}]\n`;
    conteudo += `TIPO: ${aeronave.tipo}\n`;
    conteudo += `DATA DE EMISSÃO: ${dataAtual}\n\n`;

    conteudo += `--- ETAPAS REALIZADAS ---\n`;
    aeronave.etapas.forEach((e) => {
      conteudo += `[${e.status}] ${e.nome}\n`;
    });

    conteudo += `\n--- PEÇAS UTILIZADAS ---\n`;
    aeronave.pecas.forEach((p) => {
      conteudo += `- ${p.nome} (${p.tipo})\n`;
    });

    // Cria o download do arquivo TXT
    const blob = new Blob([conteudo], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Relatorio_${aeronave.codigo}.txt`;
    link.click();
  },
};
