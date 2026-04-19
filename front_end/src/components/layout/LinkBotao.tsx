import styles from "./LinkBotao.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

interface paramsbotao {
  to: string;
  text: string;
}

function LinkBotao({ to, text }: paramsbotao) {
  return (
    <MotionLink
      className={styles.btn}
      to={to}
      whileHover={{
        scale: 1.05,
        backgroundColor: "#003366",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {text}
    </MotionLink>
  );
}

export default LinkBotao;
