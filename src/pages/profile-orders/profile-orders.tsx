import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getOrders } from '../../services/slices/orders';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector((state) => state.orders.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
