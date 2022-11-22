import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import userReducer from "./user";
import helperReducer from "./helper";
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

// 🔸 if only one reducer exists.
// const persistedReducer = persistReducer(persistConfig, cartReducer); 

// 🔸 for two and more reducers, use "combineReducers" method as written below.
const rootReducer = combineReducers({ user: userReducer, cart: cartReducer, helper: helperReducer });
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
