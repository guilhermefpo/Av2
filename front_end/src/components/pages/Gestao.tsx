import Cards from "../layout/Cards";
import { TabelaAvioes } from "../layout/TabelaAvioes";
import styles from "./Gestao.module.css";

function Gestao() {
  return (
    <div className={styles.pageStyle}>
      <Cards />
      <TabelaAvioes />
    </div>
  );
}

export default Gestao;
