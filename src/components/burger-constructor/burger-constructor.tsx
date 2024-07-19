import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { getAllIngredients } from '../slices/ingredientsSlice';
import { useDispatch, useSelector } from '../../services/store';
import {
  addIngredient,
  getOrderIngredients,
  postOrders
} from '../slices/constructorSlice';
import { useNavigate } from 'react-router-dom';
import { getIsAuth } from '../slices/userSlice';
import { getFeeds } from '../slices/feedsSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getOrderIngredients).constructorItems;
  const orderRequest = useSelector(getOrderIngredients).orderRequest;
  const orderModalData = useSelector(getOrderIngredients).orderModalData;
  const ingredients = constructorItems.ingredients;
  const bun = constructorItems.bun;
  const isAuth = useSelector(getIsAuth);

  const onOrderClick = () => {
    if (!isAuth && bun) {
      return navigate('/login');
    }
    if (bun && isAuth) {
      const order: string[] = [bun._id, ...ingredients.map((item) => item._id)];
      dispatch(postOrders(order));
    }
  };
  const closeOrderModal = () => {
    dispatch(getFeeds);
    navigate('/feed');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
