import Cards from "../layout/Cards";
import { TabelaAvioes } from "../layout/TabelaAvioes";
import Controle from "./Controle";
import styles from "./Gestao.module.css";

function Gestao() {
  return (
    <div className={styles.pageStyle}>
      <Cards />
      <TabelaAvioes />
      <Controle />
    </div>
  );
}

export default Gestao;
