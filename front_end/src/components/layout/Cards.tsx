import React from "react";
import styles from "./Cards.module.css";
import { FaAvianex } from "react-icons/fa";
import { SiTestrail } from "react-icons/si";
import { FaRegFrownOpen } from "react-icons/fa";

interface CardsDadosProps {
  totalAvioes?: number;
  EmTeste?: number;
  Atrasos?: number;
}

const Cards: React.FC<CardsDadosProps> = ({
  totalAvioes,
  EmTeste,
  Atrasos,
}) => {
  const dashboardData = [
    {
      id: 1,
      titulo: "Aviões",
      valor: totalAvioes ?? 0,
      icon: <FaAvianex size={20} />,
    },
    {
      id: 2,
      titulo: "Em Teste",
      valor: EmTeste ?? 0,
      icon: <SiTestrail size={20} />,
    },
    {
      id: 3,
      titulo: "Atrasos",
      valor: Atrasos ?? 0,
      icon: <FaRegFrownOpen size={20} />,
    },
  ];

  return (
    <section className={styles.div}>
      {dashboardData.map((item) => (
        <div key={item.id} className={styles.botao}>
          <div>{item.icon}</div>
          <h3>{item.titulo}</h3>
          <span>{item.valor}</span>
        </div>
      ))}
    </section>
  );
};

export default Cards;
