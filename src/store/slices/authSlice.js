// store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { removeTokens, storeTokens } from '../../utils/tokenStorage';


const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access, refresh, email, is_superuser } = action.payload;
      state.accessToken = access;
      state.refreshToken = refresh;
      state.user = { email, is_superuser };
      state.isAuthenticated = true;
      
      // Store tokens securely
      storeTokens({ access, refresh });
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      
      // Remove tokens from storage
      removeTokens();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentToken = (state) => state.auth.accessToken;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;