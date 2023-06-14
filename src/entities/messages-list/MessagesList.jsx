import { MessageCard } from '@/entities';

import * as S from './components';

export const MessagesList = () => {
  return (
    <S.Container>
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
    </S.Container>
  );
};
