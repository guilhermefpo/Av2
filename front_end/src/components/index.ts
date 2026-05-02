console.log("LOG: Arquivo de tipos carregado com sucesso!");

export enum NivelPermissao {
  ADMINISTRADOR = "ADM",
  ENGENHEIRO = "ENGENHEIRO",
  OPERADOR = "OPERADOR",
}

export enum TipoAeronave {
  COMERCIAL = "Comercial",
  MILITAR = "Militar",
}

export enum StatusEtapa {
  PENDENTE = "Pendente",
  EM_ANDAMENTO = "Em Andamento",
  CONCLUIDA = "Concluída",
}

export interface Etapa {
  ordem: number;
  nome: string;
  status: StatusEtapa;
  prazo?: string;
  responsaveis: string[];
}

export interface Peca {
  id: number;
  nome: string;
  quantidade: number;
  status: "Em estoque" | "Esgotado" | "Pedido solicitado";
}

export interface TesteQualidade {
  id: string;
  aeronave: string;
  tipo: "Segurança" | "Sistemas" | "Motor";
  resultado: "Aprovado" | "Pendente" | "Falha";
}

export interface Funcionario {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  usuario: string;
  senha: string;
  cargo: string;
  setor: string;
  status: string;
  nivelPermissao: NivelPermissao;
}

export interface Aeronave {
  codigo: string;
  modelo: string;
  tipo: TipoAeronave;
  capacidade: number;
  alcance: number;
  etapas: Etapa[];
  pecas: Peca[];
  testes: TesteQualidade[];
  dataEntrega?: string;
}
