import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { NivelPermissao, type Funcionario } from "../index";
import styles from "./CadastroGeral.module.css";

export default function NovoFuncionario() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [nivel, setNivel] = useState<NivelPermissao | "">("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setNome(valor);

    if (valor.trim() !== "") {
      const sugestao =
        valor.toLowerCase().split(" ")[0] + Math.floor(Math.random() * 100);
      setUsuario(sugestao);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!nome || !usuario || !nivel || !senha || !confirmarSenha) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const novoFunc: Funcionario = {
      id: Math.random().toString(36).substring(2, 9).toUpperCase(),
      nome,
      usuario,
      senha,
      nivelPermissao: nivel as NivelPermissao,
      telefone: "",
      endereco: "",
    };

    try {
      api.saveFuncionario(novoFunc);
      alert(
        `Sucesso! O colaborador agora pode logar com o usuário: ${usuario}`,
      );
      navigate("/funcionarios");
    } catch (error: any) {
      alert("Erro ao cadastrar: " + error.message);
    }
  };

  return (
    <div className={styles.pageStyle}>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2>Novo Registro de Colaborador</h2>
        <p className={styles.subtitle}>
          Defina as credenciais de acesso ao sistema.
        </p>

        <div className={styles.inputGroup}>
          <label>Nome Completo</label>
          <input
            type="text"
            placeholder="Ex: João Silva"
            className={styles.input}
            value={nome}
            onChange={handleNomeChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Nome de Usuário (Login)</label>
          <input
            type="text"
            placeholder="Ex: joao.aerocode"
            className={styles.input}
            value={usuario}
            onChange={(e) =>
              setUsuario(e.target.value.toLowerCase().replace(/\s/g, ""))
            }
            required
          />
          <small style={{ color: "#64748b", marginTop: "4px" }}>
            Este nome será usado para entrar no sistema.
          </small>
        </div>

        <div className={styles.inputGroup}>
          <label>Nível de Acesso</label>
          <select
            className={styles.input}
            value={nivel}
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

        <div className={styles.inputGroup}>
          <label>Senha de Acesso</label>
          <input
            type="password"
            placeholder="Digite a senha"
            className={styles.input}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Confirmar Senha</label>
          <input
            type="password"
            placeholder="Repita a senha"
            className={styles.input}
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>

        <div className={styles.btnGroup}>
          <button type="submit" className={styles.btn}>
            Finalizar Cadastro
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
