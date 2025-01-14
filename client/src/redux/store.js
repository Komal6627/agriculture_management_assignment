import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice'
import fieldReducer from './slice/fieldSlice'
import paymentReducer from './slice/paymentSlice'


 const store = configureStore({
  reducer: {
    auth: authReducer,
    field: fieldReducer,
    payment: paymentReducer,
  },
});

export default store