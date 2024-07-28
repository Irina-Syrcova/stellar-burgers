import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUserOrders, userOrders } from '../../services/slices/userSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userOrders());
  }, []);
  const orders: TOrder[] = useSelector(getUserOrders);
  return <ProfileOrdersUI orders={orders} />;
};
