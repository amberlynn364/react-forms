import { Link } from 'react-router-dom';
import RouterPath from '../../router/routerTypes';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.errorWrapper}>
      <img src="error-img.svg" className={styles.errorImg} alt="error-img" />
      <h2>Whoops, page does not exist</h2>
      <Link to={RouterPath.Main}>Go To Main Page!</Link>;
    </div>
  );
}
