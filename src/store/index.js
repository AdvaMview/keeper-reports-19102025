import { configureStore } from '@reduxjs/toolkit';
import userAccountReducer from './userAccountSlice';
import appSettingsReducer from './appSettingsSlice';

const store = configureStore({
    reducer: {
        userAccount: userAccountReducer,
        appSettings: appSettingsReducer,
    },
});

export default store;
