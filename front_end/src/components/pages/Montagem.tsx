import styles from "./Montagem.module.css";
import LinkBotao from "../layout/LinkBotao";
import { Link } from "react-router-dom";
import aviao from "../../assets/aviao.png";

export default function Montagem() {
  interface NavLink {
    to: string;
    label: string;
  }
  const links: NavLink[] = [
    { to: "/novo-aviao", label: "Novo Projeto" },
    { to: "/pecas", label: "Peças" },
    { to: "/testes", label: "Testes" },
    { to: "/funcionarios", label: "Funcionários" },
  ];
  return (
    <>
      <section className={styles.pageStyle}>
        <div className={styles.label}>
          <p>Gerencie suas funcionalidades: </p>
          {links.map((link) => (
            <div key={link.to}>
              <Link to={link.to} className={styles.my_link}>
                {link.label}
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.aviao}>
          <img
            src={aviao}
            alt="Avião AEROCODE"
            style={{ width: "500px", height: "auto" }}
          />
        </div>
      </section>
    </>
  );
}
