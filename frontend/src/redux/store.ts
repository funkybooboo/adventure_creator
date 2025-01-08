import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer, // Include the user slice in the store
    },
});
