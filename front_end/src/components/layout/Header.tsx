import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./Header.module.css";
import { RxAvatar } from "react-icons/rx";

interface NavLink {
  to: string;
  label: string;
}

const links: NavLink[] = [
  { to: "/gestao", label: "Gestão" },
  { to: "/montagem", label: "Montagem" },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {links.map((link) => (
          <motion.div
            key={link.to}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link className={styles.link} to={link.to}>
              {link.label}
            </Link>
          </motion.div>
        ))}
      </nav>
      <Link to="/" className={styles.avatar} title="Voltar ao login">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <RxAvatar className={styles.avatar} size={32} />
        </motion.div>
      </Link>
    </header>
  );
}
