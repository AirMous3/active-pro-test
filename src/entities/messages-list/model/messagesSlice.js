import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LOADING, READY, api, getIdFromLocalStorage } from '@/shared';

const initialState = {
  data: [],
  status: READY,
  addMessageToEnd: true,
  lastId: null,
};

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async () => {
    try {
      return await api.getMessages();
    } catch (error) {
      console.log(error);
    }
  },
);

export const getNewMessages = createAsyncThunk(
  'messages/getNewMessages',
  async (messageId, thunkAPI) => {
    const state = thunkAPI.getState().messages;
    const oldMessageId = state.lastId;

    try {
      return await api.getNewMessages(oldMessageId);
    } catch (error) {
      console.log(error);
    }
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addOrRemoveToFavorite(state, action) {
      const id = action.payload.id;
      //Если айди уже существует, то удаляем из лс
      if (getIdFromLocalStorage(id) === id) {
        localStorage.removeItem(id);
      } else {
        //Если нет, то добавляем
        localStorage.setItem(id, JSON.stringify(id));
      }
      state.data = state.data.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item,
      );
    },
    changeAddMessageToEnd(state) {
      state.addMessageToEnd = !state.addMessageToEnd;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, (state) => {
      state.status = LOADING;
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        //Айди последнего сообщения
        const lastMessageId = action.payload[action.payload.length - 1].id;
        state.lastId = lastMessageId;

        state.data = action.payload.map((item) => {
          //Если в лс есть айди, то накидываем ему favorite
          const id = getIdFromLocalStorage(item.id);
          return item.id === id ? { ...item, favorite: true } : item;
        });
      }
      state.status = READY;
    });
    builder.addCase(getNewMessages.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        const addMessageToEnd = state.addMessageToEnd;
        const newMessage = action.payload[0];
        const messageId = newMessage.id;
        const idFromLs = getIdFromLocalStorage(messageId);
        //Меняем значение айди последнего сообщения
        state.lastId = messageId;

        if (idFromLs) {
          newMessage.favorite = true;
        }

        if (addMessageToEnd) {
          state.data.push(newMessage);
        } else {
          state.data.unshift(newMessage);
        }
      }
    });
  },
});

export const messagesReducer = messagesSlice.reducer;
export const { addOrRemoveToFavorite, changeAddMessageToEnd } =
  messagesSlice.actions;
