import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LOADING, READY, api, getIdFromLocalStorage } from '@/shared';

const initialState = {
  data: [],
  status: READY,
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
    const state = thunkAPI.getState().messages.data;
    const oldMessageId = state[state.length - 1].id;
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
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, (state) => {
      state.status = LOADING;
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.data = action.payload.map((item) => {
        //Если в лс есть айди, то накидываем ему favorite
        const id = getIdFromLocalStorage(item.id);
        return item.id === id ? { ...item, favorite: true } : item;
      });
      state.status = READY;
    });
    builder.addCase(getNewMessages.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        const newMessage = action.payload[0];
        const messageId = newMessage.id;
        const idFromLs = getIdFromLocalStorage(messageId);

        if (idFromLs) {
          newMessage.favorite = true;
        }

        state.data.push(newMessage);
      }
    });
  },
});

export const messagesReducer = messagesSlice.reducer;
export const { addOrRemoveToFavorite } = messagesSlice.actions;
