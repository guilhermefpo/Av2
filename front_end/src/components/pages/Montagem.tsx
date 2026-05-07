import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NivelPermissao, type Funcionario } from "../index";
import styles from "./Montagem.module.css";
import aviao from "../../assets/aviao.png";
import aviao2 from "../../assets/aviao2.png";
import aviao3 from "../../assets/aviao3.png";

export default function Montagem() {
  const imagens = [aviao, aviao2, aviao3];
  const [index, setIndex] = useState(0);

  const userJson = localStorage.getItem("@Aerocode:usuario_logado");
  const user: Funcionario | null = userJson ? JSON.parse(userJson) : null;

  const linksGerais = [
    {
      to: "/gestao",
      label: "Dashboard de Gestão",
      roles: [NivelPermissao.ADMINISTRADOR, NivelPermissao.ENGENHEIRO],
    },
    {
      to: "/novo-aviao",
      label: "Novo Projeto",
      roles: [NivelPermissao.ADMINISTRADOR, NivelPermissao.ENGENHEIRO],
    },
    {
      to: "/pecas",
      label: "Peças",
      roles: [
        NivelPermissao.ADMINISTRADOR,
        NivelPermissao.ENGENHEIRO,
        NivelPermissao.OPERADOR,
      ],
    },
    {
      to: "/testes",
      label: "Testes",
      roles: [
        NivelPermissao.ADMINISTRADOR,
        NivelPermissao.ENGENHEIRO,
        NivelPermissao.OPERADOR,
      ],
    },
    {
      to: "/funcionarios",
      label: "Funcionários",
      roles: [
        NivelPermissao.ADMINISTRADOR,
        NivelPermissao.ENGENHEIRO,
        NivelPermissao.OPERADOR,
      ],
    },
  ];

  const linksPermitidos = linksGerais.filter(
    (link) => user && link.roles.includes(user.nivelPermissao),
  );

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagens.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, [imagens.length]);

  return (
    <section className={styles.pageStyle}>
      <div className={styles.label}>
        <header>
          <h2>Hangar Principal</h2>
          {user && (
            <p className={styles.userBadge}>
              Bem-vindo, <strong>{user.nome}</strong> ({user.nivelPermissao})
            </p>
          )}
        </header>

        <p>Selecione uma área de controle:</p>

        <nav className={styles.navMenu}>
          {linksPermitidos.map((link) => (
            <Link key={link.to} to={link.to} className={styles.my_link}>
              {link.label}
              {link.to === "/funcionarios" &&
                user?.nivelPermissao === NivelPermissao.OPERADOR && (
                  <span className={styles.readOnly}>(Consulta)</span>
                )}
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.aviao}>
        <img
          src={imagens[index]}
          alt="Aeronave em produção"
          className={styles.fadeImage}
        />
      </div>
    </section>
  );
}
