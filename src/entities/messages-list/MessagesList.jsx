import { MessageCard } from '@/entities';

import * as S from './components';

export const MessagesList = ({ messages }) => {
  return (
    <S.Container>
      {messages.map(({ author, channel, id, content, attachments, date }) => (
        <MessageCard
          key={id}
          author={author}
          subtitle={channel}
          content={content}
          attachments={attachments}
          date={date}
        />
      ))}
    </S.Container>
  );
};