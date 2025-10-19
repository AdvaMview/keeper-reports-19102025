import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: '',
    accessToken: '',
    // add more user fields as needed
};

const userAccountSlice = createSlice({
    name: 'userAccount',
    initialState,
    reducers: {
        setUser(state, action) {
            return { ...state, ...action.payload };
        },
        logout(state) {
            return { ...initialState };
        },
    },
});

export const { setUser, logout } = userAccountSlice.actions;
export default userAccountSlice.reducer;
