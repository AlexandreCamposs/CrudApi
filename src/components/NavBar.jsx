import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <header className={styles.container}>
      <div>
        <h2>
          <Link to="/">Blog</Link>
        </h2>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/newuser">Novo Usuário</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
