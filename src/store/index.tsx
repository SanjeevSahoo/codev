import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage/session";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import loaderReducer from "./loaderSlice";
import authReducer from "./authSlice";
import notificationReducer from "./notificationSlice";

const reducers = combineReducers({
  loader: loaderReducer,
  auth: authReducer,
  notification: notificationReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
