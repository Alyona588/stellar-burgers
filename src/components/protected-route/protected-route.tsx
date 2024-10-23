import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { ReactElement } from 'react';

export type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: TProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthChecked, data: user } = useSelector((state) => state.user);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && (!user.email || !user.name)) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user.email && user.name) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return children;
};
