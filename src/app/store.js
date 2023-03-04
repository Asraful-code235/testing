import { configureStore } from '@reduxjs/toolkit';
import authReducer from './user/userSlice';
import sidebarSlice from './nav/navSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarSlice,
  },
});

export default store;
