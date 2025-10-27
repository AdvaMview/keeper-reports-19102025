import React, { useEffect } from 'react';
import PaginationTableContainer from './PaginationTableContainer';

/**
 * Wrapper גנרי לטבלת פאגינציה
 * אחראי על ניהול localStorage והעברת פרופסים לקונטיינר
 */
const PaginationTableWrapper = ({
  tableId,            // מזהה ייחודי לטבלה (לשמירת מצב)
  fetchData,          // פונקציה שמביאה נתונים מהשרת
  columns,            // עמודות
  onRowClick,         // פעולה בלחיצה
  exportFileName,     // שם לקובץ ייצוא
  selectableRows,     // מאפשר בחירת שורות
  bulkActions,        // פעולות קבוצתיות
  height = 600,       // גובה ברירת מחדל
  refreshKey          // טריגר לרענון
}) => {

  useEffect(() => {
    // בדיקה אם יש הגדרות שמורות לטבלה
    const storedSettings = JSON.parse(localStorage.getItem('tableSettings')) || {};
    if (!storedSettings[tableId]) {
      storedSettings[tableId] = {
        page: 0,
        limit: 25,
        totalRows: 0,
        sort: [],
        filters: [],
        hiddenColumns: [],
        hideFilters: false,
        exportFileName: exportFileName || `${tableId}_data`,
      };
      localStorage.setItem('tableSettings', JSON.stringify(storedSettings));
    }
  }, [tableId, exportFileName]);

  return (
    <PaginationTableContainer
      tableId={tableId}
      fetchData={fetchData}
      columns={columns}
      onRowClick={onRowClick}
      exportFileName={exportFileName}
      selectableRows={selectableRows}
      bulkActions={bulkActions}
      height={height}
      refreshKey={refreshKey}
    />
  );
};

export default PaginationTableWrapper;
