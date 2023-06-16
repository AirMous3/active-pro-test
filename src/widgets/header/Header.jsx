import { useDispatch, useSelector } from 'react-redux';

import { changeAddMessageToEnd } from '@/entities';
import { Button } from '@/shared';

import * as S from './components';

export const Header = () => {
  const dispatch = useDispatch();
  const addMessageToEnd = useSelector(
    (state) => state.messages.addMessageToEnd,
  );
  const handleButton = () => {
    dispatch(changeAddMessageToEnd());
  };

  return (
    <S.Container>
      <div>
        Добавлять новые сообщения в
        <Button onClick={handleButton}>
          {addMessageToEnd ? 'Начало' : 'Конец'}
        </Button>
      </div>
    </S.Container>
  );
};
