export enum NivelPermissao {
  ADMINISTRADOR = "ADMINISTRADOR",
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

export enum TipoPeca {
  NACIONAL = "Nacional",
  IMPORTADA = "Importada",
}

export enum StatusPeca {
  PRODUCAO = "Em Produção",
  TRANSPORTE = "Em Transporte",
  PRONTA = "Pronta para Uso",
}

export interface Etapa {
  ordem: number;
  nome: string;
  status: StatusEtapa;
  prazo?: string;
  responsaveisIds: string[];
}

export interface Peca {
  id: number | string;
  nome: string;
  tipo: TipoPeca;
  fornecedor: string;
  status: StatusPeca;
  quantidade: number;
}

export interface TesteQualidade {
  id: string;
  tipo: "Elétrico" | "Hidráulico" | "Aerodinâmico";
  resultado: "Aprovado" | "Reprovado";
  data: string;
}

export interface Funcionario {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  usuario: string;
  senha: string;
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
  dataEntrega: string;
  cliente: string;
}
