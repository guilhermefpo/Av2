import styles from "./LinkBotao.module.css";
import { Link } from "react-router-dom";

interface paramsbotao {
  to: string;
  text: string;
}

function LinkBotao({ to, text }: paramsbotao) {
  return (
    <Link className={styles.btn} to={to}>
      {text}
    </Link>
  );
}

export default LinkBotao;
