import { createSlice } from '@reduxjs/toolkit';

const fieldSlice = createSlice({
  name: 'field',
  initialState: [],
  reducers: {
    addField: (state, action) => {
      state.push(action.payload);
    },
    updateField: (state, action) => {
      const index = state.findIndex((field) => field.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteField: (state, action) => {
      return state.filter((field) => field.id !== action.payload);
    },
  },
});

export const { addField, updateField, deleteField } = fieldSlice.actions;
export default fieldSlice.reducer;
