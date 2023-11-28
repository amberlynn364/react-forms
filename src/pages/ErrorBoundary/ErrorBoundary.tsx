/* eslint-disable no-console */
import { Link, useRouteError } from 'react-router-dom';
import RouterPath from '../../router/routerTypes';
import styles from './ErrorBoundary.module.css';

export default function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles.errorWrapper}>
      <img src="error-img.svg" className={styles.errorImg} alt="error-img" />
      <h2>Whoops, Something went wrong</h2>
      <Link to={RouterPath.Main}>Go To Main Page!</Link>;
    </div>
  );
}
