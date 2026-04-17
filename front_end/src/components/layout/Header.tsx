import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <li>
          <Link to="/gestao">Gestão</Link>
        </li>
        <li>
          <Link to="/montagem ">Montagem </Link>
        </li>
      </nav>
    </header>
  );
}

export default Header;
