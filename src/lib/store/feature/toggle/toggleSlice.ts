import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menu: false, // Initial state for 'menu'
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    menuToggle: (state) => {
      state.menu = !state.menu;
    },
  },
});

export const { menuToggle } = toggleSlice.actions;
export default toggleSlice.reducer;
