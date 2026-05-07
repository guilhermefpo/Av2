import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  type Aeronave,
  TipoAeronave,
  StatusEtapa,
  NivelPermissao,
  type Funcionario,
} from "../index";
import { api } from "../../services/api";
import styles from "./NovoAviao.module.css";
import aviaoImg from "../../assets/aviao.png";

const NovoAviao: React.FC = () => {
  const navigate = useNavigate();

  const userJson = localStorage.getItem("@Aerocode:usuario_logado");
  const usuarioLogado: Funcionario | null = userJson
    ? JSON.parse(userJson)
    : null;
  const eAdmin = usuarioLogado?.nivelPermissao === NivelPermissao.ADMINISTRADOR;

  useEffect(() => {
    if (!eAdmin) {
      alert(
        "Acesso Negado: Apenas Administradores podem registrar novos projetos.",
      );
      navigate("/gestao");
    }
  }, [eAdmin, navigate]);

  const [codigo, setCodigo] = useState("");
  const [modelo, setModelo] = useState("");
  const [cliente, setCliente] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [tipo, setTipo] = useState<TipoAeronave>(TipoAeronave.COMERCIAL);
  const [capacidade, setCapacidade] = useState<number>(0);
  const [alcance, setAlcance] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const avioesSalvos = api.getAeronaves();
    if (
      avioesSalvos.some((a) => a.codigo.toUpperCase() === codigo.toUpperCase())
    ) {
      alert("Erro: Este prefixo já está registrado em nossa frota.");
      return;
    }

    const etapasIniciais = [
      {
        ordem: 1,
        nome: "Climatização de Fuselagem",
        status: StatusEtapa.PENDENTE,
        responsaveisIds: [],
      },
      {
        ordem: 2,
        nome: "Rebitagem Orbital",
        status: StatusEtapa.PENDENTE,
        responsaveisIds: [],
      },
      {
        ordem: 3,
        nome: "Montagem do Trem de Pouso",
        status: StatusEtapa.PENDENTE,
        responsaveisIds: [],
      },
      {
        ordem: 4,
        nome: "Instalação de Aviônicos",
        status: StatusEtapa.PENDENTE,
        responsaveisIds: [],
      },
    ];

    const novaAeronave: Aeronave = {
      codigo: codigo.toUpperCase(),
      modelo,
      cliente,
      tipo,
      capacidade,
      alcance,
      etapas: etapasIniciais,
      pecas: [],
      testes: [],
      dataEntrega,
    };

    try {
      const novasAeronaves = [...avioesSalvos, novaAeronave];
      localStorage.setItem(
        "@Aerocode:aeronaves",
        JSON.stringify(novasAeronaves),
      );
      alert(`Sucesso! Projeto ${codigo.toUpperCase()} iniciado.`);
      navigate("/gestao");
    } catch (error) {
      alert("Erro ao salvar o projeto no sistema.");
    }
  };

  if (!eAdmin) return null;

  return (
    <div className={styles.pageStyle}>
      <section className={styles.contentGrid}>
        <div className={styles.aviaoImage}>
          <img src={aviaoImg} alt="Desenho Técnico Aeronave" />
          <div className={styles.badgeInfo}>
            <span>Status: Configuração de Projeto</span>
          </div>
        </div>

        <div className={styles.formContainer}>
          <h2 className={styles.title}>Registrar Aeronave</h2>
          <p className={styles.subtitle}>
            Inicie uma nova ordem de produção no hangar.
          </p>

          <form onSubmit={handleSubmit} className={styles.formElement}>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Prefixo (Prefixo Único)</label>
                <input
                  type="text"
                  placeholder="Ex: PP-XYZ"
                  className={styles.input_style}
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Modelo</label>
                <input
                  type="text"
                  placeholder="Ex: Legacy 650"
                  className={styles.input_style}
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Cliente (Operador/Dono)</label>
              <input
                type="text"
                placeholder="Ex: Embraer S.A. / Particular"
                className={styles.input_style}
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Data Prevista de Entrega</label>
              <input
                type="date"
                className={styles.input_style}
                value={dataEntrega}
                onChange={(e) => setDataEntrega(e.target.value)}
                required
              />
            </div>

            <hr className={styles.divider} />

            <div className={styles.inputGroup}>
              <label>Categoria de Voo</label>
              <select
                className={styles.input_style}
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoAeronave)}
              >
                <option value={TipoAeronave.COMERCIAL}>✈️ Comercial</option>
                <option value={TipoAeronave.MILITAR}>🎖️ Militar</option>
              </select>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Capacidade (PAX)</label>
                <input
                  type="number"
                  className={styles.input_style}
                  value={capacidade}
                  onChange={(e) => setCapacidade(Number(e.target.value))}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Alcance (Km)</label>
                <input
                  type="number"
                  className={styles.input_style}
                  value={alcance}
                  onChange={(e) => setAlcance(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.btnSalvar}>
                🚀 Enviar para Linha de Montagem
              </button>
              <Link to="/gestao" className={styles.cancelarLink}>
                Voltar
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default NovoAviao;
