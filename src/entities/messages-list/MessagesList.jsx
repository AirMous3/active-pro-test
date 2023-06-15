import { useSelector } from 'react-redux';

import { MessageCard } from '@/entities';

import * as S from './components';

export const MessagesList = () => {
  const messages = useSelector((state) => state.messages.data);

  return (
    <S.Container>
      {messages.map(
        ({ author, channel, id, content, attachments, date, favorite }) => (
          <MessageCard
            key={id}
            author={author}
            subtitle={channel}
            content={content}
            attachments={attachments}
            date={date}
            favorite={favorite}
            id={id}
          />
        ),
      )}
    </S.Container>
  );
};
