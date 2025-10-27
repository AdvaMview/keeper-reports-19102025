import React from 'react';
import PaginationTableWrapper from './PaginationTableWrapper';

const PaginationTableParent = ({
  fetchData,          // פונקציה שמחזירה נתונים
  onRowClick,         // פעולה בלחיצה כפולה או רגילה
  columns,            // הגדרת עמודות
  exportFileName,     // שם קובץ לייצוא
  selectableRows,     // מאפשר בחירת שורות
  bulkActions,        // פעולות קבוצתיות
  height = 600,       // גובה ברירת מחדל
  refreshKey          // טריגר לרענון חיצוני
}) => {
  return (
    <PaginationTableWrapper
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

export default PaginationTableParent;
