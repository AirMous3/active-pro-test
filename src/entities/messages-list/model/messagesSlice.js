import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LOADING, READY, api } from '@/shared';

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, (state) => {
      state.status = LOADING;
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = READY;
    });
  },
});

export const messagesReducer = messagesSlice.reducer;
