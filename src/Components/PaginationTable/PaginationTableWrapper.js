import React from 'react';
import PaginationTableContainer from './PaginationTableContainer';

const PaginationTableWrapper = (props) => {
    const {
        // maxHeight,
        dataFunctionName,
        onRowDoubleClick,
        exceptionId,
        excelFileName,
        url,
        unHiddenColumns,
        anableSelectRows,
        bulkOperation,
        tableHeight,
        refresh
    } = props

    //init data source 
    const storedTableSettings = JSON.parse(localStorage.getItem('tableSettings'));
    if (!storedTableSettings) {
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
            'GetExceptionDetails': initObj,
            'GetExceptionResultEl': initObj,
            'GetExceptionResultEu': initObj,
            'ExceptionData': initObj,
        };
        localStorage.setItem('tableSettings', JSON.stringify(initDataSourceSlice));
    }
    
    return (
        <PaginationTableContainer
            dataFunctionName={dataFunctionName}
            url={url}
            onRowDoubleClick={onRowDoubleClick}
            exceptionId={exceptionId}
            excelFileName={excelFileName}
            unHiddenColumns={unHiddenColumns}
            anableSelectRows={anableSelectRows}
            bulkOperation={bulkOperation}
            tableHeight={tableHeight}
            refresh={refresh}
        />
    )
}

export default PaginationTableWrapper