import { Link } from 'react-router-dom';
import styles from './Main.module.css';
import RouterPath from '../../router/routerTypes';

export default function Main() {
  return (
    <main className={styles.main}>
      <h1>Main Page</h1>
      <div className={styles.linksWrapper}>
        <Link to={RouterPath.ReactHookForms} className={styles.link}>
          React Hook Forms
        </Link>
        <Link to={RouterPath.UncontrolledForms} className={styles.link}>
          Uncontrolled Forms
        </Link>
      </div>
    </main>
  );
}
