import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { NivelPermissao, type Funcionario } from "../index";
import styles from "./CadastroGeral.module.css";

export default function NovoFuncionario() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [nivel, setNivel] = useState<NivelPermissao | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const novoFunc: Funcionario = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      nome,
      usuario:
        nome.toLowerCase().split(" ")[0] + Math.floor(Math.random() * 100),
      senha: "123",
      nivelPermissao: nivel as NivelPermissao,
      telefone: "",
      endereco: "",
    };

    try {
      api.saveFuncionario(novoFunc);
      alert(
        `Colaborador ${nome} cadastrado com sucesso!\nUsuário: ${novoFunc.usuario}`,
      );
      navigate("/funcionarios");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.pageStyle}>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2>Novo Registro de Colaborador</h2>
        <p className={styles.subtitle}>Preencha os dados básicos de acesso.</p>

        <div className={styles.inputGroup}>
          <label>Nome Completo</label>
          <input
            type="text"
            placeholder="Ex: João Silva"
            className={styles.input}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Nível de Acesso</label>
          <select
            className={styles.input}
            onChange={(e) => setNivel(e.target.value as NivelPermissao)}
            required
          >
            <option value="">Selecione o Cargo</option>
            <option value={NivelPermissao.OPERADOR}>Operador</option>
            <option value={NivelPermissao.ENGENHEIRO}>Engenheiro</option>
            <option value={NivelPermissao.ADMINISTRADOR}>
              Administrador (ADM)
            </option>
          </select>
        </div>

        <div className={styles.btnGroup}>
          <button type="submit" className={styles.btn}>
            🚀 Finalizar Cadastro
          </button>
          <button
            type="button"
            className={styles.btnVoltar}
            onClick={() => navigate("/funcionarios")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
