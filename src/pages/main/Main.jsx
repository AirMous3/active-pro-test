import axios from 'axios';
import { useEffect, useState } from 'react';

import { MessagesList } from '@/entities';

import * as S from './components';

export const Main = () => {
  const [data, setData] = useState();
  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.post(
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
      );
      setData(res);
    };
    fetchData();
  }, []);

  return (
    <S.Container>
      <MessagesList />
    </S.Container>
  );
};
