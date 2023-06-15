import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MessagesList, getMessages } from '@/entities';
import { LOADING, Loader } from '@/shared';

import * as S from './components';

export const Main = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.messages.status);

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  return (
    <S.Container>
      {status === LOADING ? <Loader /> : <MessagesList />}
    </S.Container>
  );
};
