import { useContext } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { RouteContext } from '../../context';
import { RouteContextType } from '../../types/routes';
const LayoutWrapper = (props: any) => {
  const newRoutes: any = useContext(RouteContext) as RouteContextType;
  const pathname = useLocation();
  const routes = useRoutes([...newRoutes.routes]);
  return routes;
};
export default LayoutWrapper;
