import { Link } from "react-router-dom";
import LinkBotao from "../layout/LinkBotao";
import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.pageStyle}>
      <div className={styles.loginCard}>
        <h2>AEROCODE</h2>
        <p>Acesse o Sistema de Gestão</p>
        <div className={styles.border}>
          <input
            type="text"
            placeholder="Usuário"
            className={styles.input_style}
          />
          <br />
          <input
            type="password"
            placeholder="Senha"
            className={styles.input_style}
          />
          <br />
          <br />
          <LinkBotao to="/gestao" text="Logar" />

          <div className={styles.linkContainer}>
            <Link to="/cadastro" className={styles.linkCadastro}>
              Não tem uma conta? <strong>Cadastre-se aqui</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
