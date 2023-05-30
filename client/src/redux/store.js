import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import cartReducer from "./cartRedux";
import productReducer from "./productRedux";
import categoryReducer from "./categoryRedux";
import subcatReducer from "./subcatRedux";
import wishlistReducer from "./wishlistRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  product: productReducer,
  category: categoryReducer,
  subcat: subcatReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
