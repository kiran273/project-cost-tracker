import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isAuthenticated: false },
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      state.user = user ? {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || null,
      } : null;
      state.isAuthenticated = !!user;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;