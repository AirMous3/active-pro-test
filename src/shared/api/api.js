import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://a0830433.xsph.ru/',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const api = {
  getMessages() {
    return instance
      .post('', {
        actionName: 'MessagesLoad',
        messageId: 0,
      })
      .then((data) => data.data.Messages);
  },
  getNewMessages(messageId) {
    return instance
      .post('', {
        actionName: 'MessagesLoad',
        messageId,
      })
      .then((data) => data.data.Messages);
  },
};
