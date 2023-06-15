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
  },
});

export const messagesReducer = messagesSlice.reducer;
export const { addOrRemoveToFavorite } = messagesSlice.actions;
