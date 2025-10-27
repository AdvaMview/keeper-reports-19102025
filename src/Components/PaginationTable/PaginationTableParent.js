import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store/index';

import PaginationTableWrapper from './PaginationTableWrapper';

const PaginationTableParent = (props) => {
    const { 
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

    return (
        <Provider store={store}>
            <PaginationTableWrapper
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
        </Provider>
    )
}

export default PaginationTableParent