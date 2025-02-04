import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "./features/CoinSlice";

export const store = configureStore({
    reducer:coinReducer
});

export type RootState = ReturnType<typeof store.getState>;