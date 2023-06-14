import axios from 'axios';
import { useEffect, useState } from 'react';

import { MessagesList } from '@/entities';

import * as S from './components';

export const Main = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios
        .post(
          `${process.env.REACT_APP_API}`,
          {
            actionName: 'MessagesLoad',
            messageId: 0,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then((data) => data.data.Messages);
      setMessages(res);
    };
    fetchData();
  }, []);

  return (
    <S.Container>
      <MessagesList messages={messages} />
    </S.Container>
  );
};
