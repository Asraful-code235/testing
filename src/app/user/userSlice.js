import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const token = Cookies.get('token');
const initialState = {
  token: token ? token : null,
  isAuthenticated: false,
};

const useSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      Cookies.set('token', action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      Cookies.remove('token');
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, clearToken } = useSlice.actions;

export default useSlice.reducer;
