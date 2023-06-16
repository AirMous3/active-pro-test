import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MessagesList, getMessages, getNewMessages } from '@/entities';
import { LOADING, Loader } from '@/shared';
import { Header } from '@/widgets';

import * as S from './components';

export const Main = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.messages.status);

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getNewMessages());
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <S.Container>
      <Header />
      {status === LOADING ? <Loader /> : <MessagesList />}
    </S.Container>
  );
};
