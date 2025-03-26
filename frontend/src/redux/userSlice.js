import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice ({
    name: 'user',
    initialState: {
        token: null,
        role: null,
    },

    reducers: {
        setUser: (state, action) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.token = null;
            state.role = null;
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;