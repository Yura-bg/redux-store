import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import UserSlice from "../features/User Register/UserSlice";
import TaskSlice from "../features/User Register/TaskSlice";

const store = configureStore({
    reducer:{
        user:UserSlice,
        task:TaskSlice
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store