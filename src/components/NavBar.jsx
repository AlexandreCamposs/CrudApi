import { Link, NavLink } from 'react-router-dom';
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
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newuser"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Novo Usuário
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
