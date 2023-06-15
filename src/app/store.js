import { configureStore } from '@reduxjs/toolkit';

import { messagesReducer } from '@/entities';

const rootReducer = {
  messages: messagesReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
