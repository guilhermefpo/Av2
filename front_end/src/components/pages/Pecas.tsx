import React from "react";
import styles from "./Pecas.module.css";
import { Link } from "react-router-dom";

interface NavLink {
  to: string;
  label: string;
}

const links: NavLink[] = [{ to: "/montagem", label: "Voltar" }];

function Pecas() {
  return (
    <div className={styles.pageStyle}>
      <Link to={links[0].to} className={styles.my_link}>
        {links[0].label}
      </Link>
    </div>
  );
}
export default Pecas;
