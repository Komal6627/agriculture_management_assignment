import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: [],
  reducers: {
    addTransaction: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addTransaction } = paymentSlice.actions;
export default paymentSlice.reducer;
