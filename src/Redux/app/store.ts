import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartStateReducer from "../features/productCartSlice";
import productStateReducer from "../features/productSlice";
import userStateReducer from "../features/userSlice";
import wishlistStateReducer from "../features/wishlistSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";


const persistConfig = {
	key: "root",
	version: 1,
	storage
}

const reducer = combineReducers({
	cartState: cartStateReducer,
	productState: productStateReducer,
	userState: userStateReducer,
	wishlistState: wishlistStateReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
	reducer: persistedReducer
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);