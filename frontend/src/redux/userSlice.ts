import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state structure
interface UserState {
    user: { id: number; name: string } | null; // Adjust based on your user model
}

const initialState: UserState = {
    user: null,
};

// Create a slice for managing user state
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{ id: number; name: string }>) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
        },
    },
});

// Export actions to dispatch from components
export const { setUser, clearUser } = userSlice.actions;

// Export the reducer to be used in the store
export const userReducer = userSlice.reducer;
