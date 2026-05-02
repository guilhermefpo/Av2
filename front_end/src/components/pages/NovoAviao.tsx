import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import type {
  Aeronave,
  TipoAeronave,
  StatusEtapa,
  NivelPermissao,
} from "../index";
import styles from "./NovoAviao.module.css";
import aviaoImg from "../../assets/aviao.png";

const NovoAviao: React.FC = () => {
  const navigate = useNavigate();

  const cargo = localStorage.getItem("@Aerocode:cargo") as NivelPermissao;
  const eAdmin = cargo === NivelPermissao.ADMINISTRADOR;

  useEffect(() => {
    if (!eAdmin) {
      alert(
        "Acesso Negado: Apenas Administradores podem registrar novas aeronaves.",
      );
      navigate("/gestao");
    }
  }, [eAdmin, navigate]);

  const [codigo, setCodigo] = useState("");
  const [modelo, setModelo] = useState("");
  const [tipo, setTipo] = useState<TipoAeronave>(TipoAeronave.COMERCIAL);
  const [capacidade, setCapacidade] = useState<number>(0);
  const [alcance, setAlcance] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const avioesSalvos: Aeronave[] = JSON.parse(
      localStorage.getItem("@Aerocode:avioes_db") || "[]",
    );

    if (
      avioesSalvos.some((a) => a.codigo.toUpperCase() === codigo.toUpperCase())
    ) {
      alert("Erro: Já existe uma aeronave registrada com este código.");
      return;
    }

    const etapasIniciais = [
      {
        ordem: 1,
        nome: "Climatização de Fuselagem",
        status: StatusEtapa.PENDENTE,
      },
      { ordem: 2, nome: "Rebitagem Orbital", status: StatusEtapa.PENDENTE },
      {
        ordem: 3,
        nome: "Montagem do Trem de Pouso",
        status: StatusEtapa.PENDENTE,
      },
      {
        ordem: 4,
        nome: "Instalação de Aviônicos",
        status: StatusEtapa.PENDENTE,
      },
    ];

    const novaAeronave: Aeronave = {
      codigo: codigo.toUpperCase(),
      modelo,
      tipo,
      capacidade,
      alcance,
      pecas: [],
      etapas: etapasIniciais,
      testes: [],
      dataEntrega: "",
    };

    // Persistência
    avioesSalvos.push(novaAeronave);
    localStorage.setItem("@Aerocode:avioes_db", JSON.stringify(avioesSalvos));

    alert(`Sucesso! Aeronave ${codigo} enviada para a linha de produção.`);
    navigate("/gestao");
  };

  if (!eAdmin) return null;

  return (
    <div className={styles.pageStyle}>
      <section className={styles.contentGrid}>
        <div className={styles.aviaoImage}>
          <img src={aviaoImg} alt="Desenho Técnico Aeronave" />
          <div className={styles.badgeInfo}>
            <span>Status: Novo Projeto</span>
          </div>
        </div>

        <div className={styles.formContainer}>
          <h2 className={styles.title}>Registrar Aeronave</h2>
          <p className={styles.subtitle}>
            Insira os dados técnicos para iniciar a montagem.
          </p>

          <form onSubmit={handleSubmit} className={styles.formElement}>
            <div className={styles.inputGroup}>
              <label>Prefixo / Código Único</label>
              <input
                type="text"
                placeholder="Ex: EMB-314"
                className={styles.input_style}
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Modelo Comercial</label>
              <input
                type="text"
                placeholder="Ex: Super Tucano"
                className={styles.input_style}
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Categoria de Uso</label>
              <select
                className={styles.input_style}
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoAeronave)}
              >
                <option value={TipoAeronave.COMERCIAL}>Comercial</option>
                <option value={TipoAeronave.MILITAR}>Militar</option>
              </select>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Capacidade (Passageiros)</label>
                <input
                  type="number"
                  placeholder="0"
                  className={styles.input_style}
                  value={capacidade}
                  onChange={(e) => setCapacidade(Number(e.target.value))}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Alcance Máx (Km)</label>
                <input
                  type="number"
                  placeholder="0"
                  className={styles.input_style}
                  value={alcance}
                  onChange={(e) => setAlcance(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.btnSalvar}>
                🚀 Iniciar Produção
              </button>
              <Link to="/gestao" className={styles.cancelarLink}>
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default NovoAviao;
