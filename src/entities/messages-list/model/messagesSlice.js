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
    changeSorting(state) {
      state.addMessageToEnd = !state.addMessageToEnd;
      const sortToEnd = state.addMessageToEnd;

      state.data = state.data.sort((a, b) =>
        !sortToEnd ? (a.id > b.id ? -1 : 1) : a.id > b.id ? 1 : -1,
      );
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

        //Если в лс есть айди, то накидываем ему favorite
        state.data = action.payload.map((item) => {
          const id = getIdFromLocalStorage(item.id);
          return item.id === id ? { ...item, favorite: true } : item;
        });
      }
      state.status = READY;
    });
    builder.addCase(getNewMessages.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        const addMessageToEnd = state.addMessageToEnd;
        const lastMessageId = action.payload[0].id;
        //проходимся и проставляем избранное
        const newMessages = action.payload.map((item) =>
          item.id === getIdFromLocalStorage(item.id)
            ? {
                ...item,
                favorite: true,
              }
            : item,
        );

        //Меняем значение айди последнего сообщения
        state.lastId = lastMessageId;
        if (addMessageToEnd) {
          state.data = state.data.concat(newMessages);
        } else {
          state.data.unshift(...newMessages);
        }
      }
    });
  },
});

export const messagesReducer = messagesSlice.reducer;
export const { addOrRemoveToFavorite, changeSorting } = messagesSlice.actions;
