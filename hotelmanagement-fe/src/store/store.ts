import { configureStore } from "@reduxjs/toolkit";
import { apiWithTag } from "../api/emptySplitApi";
import userReducer from "../features/users/userSlice";
import { rtkQueryNotificationLogger } from "../middleware";

export const store = configureStore({
  reducer: {
    users: userReducer,
    [apiWithTag.reducerPath]: apiWithTag.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiWithTag.middleware,
      rtkQueryNotificationLogger
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
