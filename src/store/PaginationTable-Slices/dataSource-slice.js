import { createSlice } from '@reduxjs/toolkit';
const storedTableSettings = JSON.parse(localStorage.getItem('tableSettings')) || {};
const initObj = {
    page: 0,
    limit: 100,
    totalRows: 0,
    sort: [],
    filter: [],
    hideFilters: true,
    tableColumns: [],
    excelFileName: '',
    prevExId: null
}

const initDataSourceSlice = {
    'GetExceptionDetails': storedTableSettings['GetExceptionDetails'] || initObj,
    'Neigbor': storedTableSettings['Neigbor'] || initObj,
    'Pci': storedTableSettings['Pci'] || initObj,
    'NRPci': storedTableSettings['NRPci'] || initObj,
    'RACHPci': storedTableSettings['RACHPci'] || initObj,
    'GetExceptionResultEl': storedTableSettings['GetExceptionResultEl'] || initObj,
    'GetExceptionResultEu': storedTableSettings['GetExceptionResultEu'] || initObj,
    'ExceptionData': storedTableSettings['ExceptionData'] || initObj,
};


const updateLocalStorage = (currentState, tableName) => {
    let localStorageTableSettings = JSON.parse(localStorage.getItem('tableSettings'));
    const updatedSettings = { [tableName]: { ...currentState[tableName] } };
    localStorageTableSettings[tableName] = { ...localStorageTableSettings[tableName], ...updatedSettings[tableName] };
    localStorage.setItem('tableSettings', JSON.stringify(localStorageTableSettings));
}


const dataSourceSlice = createSlice({
  name: 'dataSource',
  initialState: initDataSourceSlice,
  reducers: {
    updateSliceValue(state, action) {
      const payload = action.payload
      if (payload) {
        const { tableName, key, value } = payload
        if (state[tableName]) {
          state[tableName][key] = value
          updateLocalStorage({ ...state }, tableName)
        }
      }
    },
    resetDataSource(state, action) {
      const payload = action.payload
      if (payload) {
        const { tableName } = payload
        state[tableName] = initObj
      }
    },
  }
});

export const dataSourceActions = dataSourceSlice.actions;
export default dataSourceSlice.reducer; 
