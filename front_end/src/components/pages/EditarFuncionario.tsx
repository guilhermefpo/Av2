import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { NivelPermissao } from "../index";
import styles from "./CadastroGeral.module.css";

export default function EditarFuncionario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [nivel, setNivel] = useState<NivelPermissao | "">("");

  useEffect(() => {
    const funcionarios = api.getFuncionarios();
 
    const fParaEditar = funcionarios.find((f) => f.id === id);

    if (fParaEditar) {
      setNome(fParaEditar.nome);
      setNivel(fParaEditar.nivelPermissao);
    } else {
      alert("Funcionário não encontrado no sistema.");
      navigate("/funcionarios");
    }
  }, [id, navigate]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    const funcionarios = api.getFuncionarios();
    const novaLista = funcionarios.map((f) => {
      if (f.id === id) {
        return {
          ...f,
          nome,
          nivelPermissao: nivel as NivelPermissao,
        };
      }
      return f;
    });

    localStorage.setItem("@Aerocode:funcionarios", JSON.stringify(novaLista));
    alert(`Dados de ${nome} atualizados com sucesso!`);
    navigate("/funcionarios");
  };

  return (
    <div className={styles.pageStyle}>
      <form className={styles.formCard} onSubmit={handleUpdate}>
        <h2>Editar Registro Técnico</h2>
        <p className={styles.subtitle}>Matrícula: {id}</p>

        <div className={styles.inputGroup}>
          <label>Nome do Colaborador</label>
          <input
            type="text"
            className={styles.input}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Nível de Acesso / Cargo</label>
          <select
            className={styles.input}
            value={nivel}
            onChange={(e) => setNivel(e.target.value as NivelPermissao)}
            required
          >
            <option value="">Selecione...</option>
            <option value={NivelPermissao.OPERADOR}>Operador</option>
            <option value={NivelPermissao.ENGENHEIRO}>Engenheiro</option>
            <option value={NivelPermissao.ADMINISTRADOR}>
              Administrador (ADM)
            </option>
          </select>
        </div>

        <div className={styles.btnGroup}>
          <button type="submit" className={styles.btn}>
            💾 Confirmar Alterações
          </button>
          <button
            type="button"
            className={styles.btnVoltar}
            onClick={() => navigate("/funcionarios")}
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}
