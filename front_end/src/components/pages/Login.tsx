import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.pageStyle}>
      <div className={styles.loginCard}>
        <h2 style={{ color: "#003366", marginBottom: "1rem" }}>AEROCODE</h2>
        <p>Acesse o Sistema de Gestão</p>

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
        <button className={styles.button_style}>Logar</button>
      </div>
    </div>
  );
}

export default Login;
