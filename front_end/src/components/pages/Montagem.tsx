import { useState, useEffect } from "react";
import styles from "./Montagem.module.css";
import { Link } from "react-router-dom";
import aviao from "../../assets/aviao.png";
import aviao2 from "../../assets/aviao2.png";
import aviao3 from "../../assets/aviao3.png";

export default function Montagem() {
  const links = [
    { to: "/novo-aviao", label: "Novo Projeto" },
    { to: "/pecas", label: "Peças" },
    { to: "/testes", label: "Testes" },
    { to: "/funcionarios", label: "Funcionários" },
    { to: "/gestao", label: "Dashboard de Gestão" },
  ];

  const imagens = [aviao, aviao2, aviao3];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagens.length);
    }, 3000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className={styles.pageStyle}>
      <div className={styles.label}>
        <h2>Hangar Principal</h2>
        <p>Selecione uma área de controle:</p>
        <nav className={styles.navMenu}>
          {links.map((link) => (
            <Link key={link.to} to={link.to} className={styles.my_link}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className={styles.aviao}>
        <img src={imagens[index]} alt="Linha de Produção Aerocode" />
      </div>
    </section>
  );
}
