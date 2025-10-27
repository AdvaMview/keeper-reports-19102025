import { configureStore } from '@reduxjs/toolkit';
import dataSourceSilce from './PaginationTable-Slices/dataSource-slice';


const store = configureStore({
    reducer: {
        dataSource: dataSourceSilce.reducer
    }
});

export default store;
