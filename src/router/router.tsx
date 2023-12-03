import { createBrowserRouter } from 'react-router-dom';
import RouterPath from './routerTypes';
import Main from '../pages/Main/Main';
import ErrorBoundary from '../pages/ErrorBoundary/ErrorBoundary';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import UncontrolledForms from '../pages/UncontrolledForms/UncontrolledForms';
import ReactHookForms from '../pages/ReactHookForms/ReactHookForms';

const router = createBrowserRouter([
  {
    path: RouterPath.Main,
    element: <Main />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: RouterPath.UncontrolledForms,
    element: <UncontrolledForms />,
  },
  {
    path: RouterPath.ReactHookForms,
    element: <ReactHookForms />,
  },
  {
    path: RouterPath.NotFoundPage,
    element: <NotFoundPage />,
  },
]);

export default router;
