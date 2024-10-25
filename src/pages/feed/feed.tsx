import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/slices/feeds';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.feeds);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <FeedUI orders={data.orders} handleGetFeeds={handleGetFeeds} />
      )}
    </>
  );
};
