import React, { createRef, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import clsx from "clsx";
import { useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Box,
  TablePagination,
  TableContainer,
  Paper,
  LinearProgress,
  Typography,
  Checkbox,
  Tooltip,
} from "@mui/material";
import Filter from "./Filter";
import { styled } from "@mui/material/styles";

import { useState } from "react";
import { useCallback } from "react";

const HeaderCell = styled(TableCell)(({ theme }) => ({
  root: {
    //height: '65vh',
    marginRight: 32,
    //height: '100%',
  },
  tableContainer: {
    //height:'100%'
    //height: '58vh'
  },
  headerCell: {
    backgroundColor: theme.palette.background.default,
    fontWeight: "bold",
  },
  numCell: {
    backgroundColor: theme.palette.background.default,
  },

  tableRightBorder: {
    borderWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(81, 81, 81, 1)",
    borderStyle: "solid",
  },
  resizeLine: {
    position: "absolute",
    height: "100%",
    width: "8px",
    top: 0,
    right: "-4px",
    //transform: 'translate(50%, 0px)',
    borderRadius: 5,
    cursor: "col-resize",
    "&:hover": {
      backgroundColor: "#0AA1DD",
    },
    "&:active": {
      backgroundColor: "#0AA1DD",
    },
  },
  tableCell: {
    "&.resizable": {
      position: "relative",
    },
    "&.emptyCell": {
      width: "auto",
    },
    padding: "4px 8px",
  },
  tableHead: {
    userSelect: "none",
  },
  table: {
    tableLayout: "fixed",
    width: "100%",
  },
  td: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: "0.8rem",
    fontWeight: "lighter",
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
  },
}));

//const DEFAULT_MIN_WIDTH_CELL = 140;
const DEFAULT_MIN_WIDTH_CELL = 50;
const DEFAULT_MAX_WIDTH_CELL = 1500;

const PaginationTable = (props) => {
  // const classes = useStyles();
  const {
    handleFilter,
    handleSort,
    onLimitChange,
    onPageChange,
    innerRows,
    totalRowsCountUpdated,
    filter, //take this filter from props for better user experiance.
    isLoading,
    onRowDoubleClick,
    reorderColumnsHandler,
    onColumnWidthChanged,
    dataFunctionName,
    anableSelectRows,
    selectedRecords,
    selectedSomeRecords,
    selectedAllRecords,
    onSelectAllRecords,
    onSelectOneRecord,
    filterOptions,
    tableHeight = 88,
  } = props;

  // const {
  //   page,
  //   limit,
  //   sort,
  //   hideFilters,
  //   tableColumns: existingColumns,
  // } = useSelector((state) => state.dataSource[dataFunctionName]);
  const dataSource =
    useSelector((state) => state.dataSource?.[dataFunctionName]) || {};

  const {
    page = 0,
    limit = 100,
    sort = [],
    hideFilters = false,
    tableColumns: existingColumns = [],
  } = dataSource;

  // Add the new rowNumber column
  const newRowNumberColumn = {
    field: "rowNumber",
    headerName: "#",
    width: 50,
    renderCell: (params) => params.rowIndex + 1,
  };

  const columns = [newRowNumberColumn, ...existingColumns];

  const columnRefs = React.useMemo(
    () => [...columns.map(() => createRef())],
    [columns]
  );

  const parentBoxRef = useRef(null);
  const isResizing = useRef(-1);

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // padding: grid * 2,
    // margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
    //width:'300px',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    // padding: grid,
    // display: 'flex'
  });

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    reorderColumnsHandler(
      result.source.index - 1,
      result.destination.index - 1
    );
  };

  useEffect(() => {
    // loadColumnInfoLocalStorage();
    document.onmousemove = handleOnMouseMove;
    document.onmouseup = handleOnMouseUp;
    return () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }, [columns]);

  const mapColumnsWidth = () => {
    let columnsInfo = {};

    if (columns && columns.length > 0) {
      columns.forEach((col, index) => {
        if (columnRefs[index].current) {
          columnsInfo[col.field] = {};
          columnsInfo[col.field] =
            columnRefs[index].current.parentElement.style.width;
        }
      });
    }
    return columnsInfo;
  };

  const adjustWidthColumn = (index, width) => {
    const minWidth = columns[index]?.minWidth ?? DEFAULT_MIN_WIDTH_CELL;
    const maxWidth = columnRefs[index]?.maxWidth ?? DEFAULT_MAX_WIDTH_CELL;
    const newWidth =
      width > maxWidth ? maxWidth : width < minWidth ? minWidth : width;

    columnRefs[index].current.parentElement.style.width = newWidth + "px";
    //columnRefs[index].current.parentElement.style.width = width + "px";
  };

  const setCursorDocument = (isResizing) => {
    document.body.style.cursor = isResizing ? "col-resize" : "auto";
  };

  const handleOnMouseMove = (e) => {
    if (isResizing.current >= 0 && columnRefs[isResizing.current].current) {
      const parentLeftPoint =
        columnRefs[
          isResizing.current
        ].current.parentElement?.getBoundingClientRect().left;

      const newWidth = e.clientX - parentLeftPoint; //- 30

      adjustWidthColumn(isResizing.current, newWidth);
    }
  };

  const handleOnMouseUp = () => {
    console.log("end resize");
    if (isResizing.current !== -1) {
      const columnInfo = mapColumnsWidth();
      onColumnWidthChanged(columnInfo);
    }
    isResizing.current = -1;
    //saveColumnInfoLocalStorage();
    setCursorDocument(false);
  };

  const onClickResizeColumn = (index) => {
    console.log("start resize");
    isResizing.current = index;
    setCursorDocument(true);
  };

  const copyCellValue = async (event, cellValue) => {
    try {
      // Check if the Clipboard API is supported by the browser
      if (navigator.clipboard && navigator.clipboard.writeText) {
        // Use the Clipboard API to copy the cellValue to the clipboard
        await navigator.clipboard.writeText(cellValue);
        // Optionally, you can show a success message or perform other actions here
      } else {
        // // If the Clipboard API is not supported, fallback to document.execCommand
        // const textArea = document.createElement('textarea');
        // textArea.value = cellValue;
        // document.body.appendChild(textArea);
        // textArea.select();
        // document.execCommand('copy');
        // document.body.removeChild(textArea);
        // // Optionally, you can show a success message or perform other actions here
      }
    } catch (error) {
      console.error("Error copying value to clipboard:", error);
      // Handle the error, such as showing an error message to the user
    }
  };

  useEffect(() => {
    // Access the width of the parent Box after it has been rendered
    if (parentBoxRef.current) {
      const parentBoxWidth = parentBoxRef.current.offsetWidth;
      console.log("Parent Box Width:", parentBoxWidth);
    }
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const entireGridWidth = columns
    .filter((column) => !column.hidden)
    .reduce((totalWidth, column) => totalWidth + (column.width || 0), 0);

  //add the width of the checkbox column
  const actualTableWidth =
    Math.min(entireGridWidth, parentBoxRef.current?.offsetWidth || 0) +
    (anableSelectRows ? 49 : 0) +
    20;

  return (
    <Box
      style={{ position: "relative", height: `${tableHeight}vh` }}
      ref={parentBoxRef}
    >
      {isLoading && (
        <div
          style={{
            zIndex: 2,
            position: "absolute",
            width: 400,
            top: "40%",
            left: "40%",
          }}
        >
          <LinearProgress />
        </div>
      )}
      {/* <TableContainer style={{ height: '58vh', width: actualTableWidth }} component={Paper}> */}
      <TableContainer
        style={{ width: actualTableWidth, height: `${tableHeight - 7}vh` }}
        component={Paper}
      >
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                  <TableRow
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {anableSelectRows && (
                      <TableCell padding="checkbox" style={{ width: 45 }}>
                        <Checkbox
                          checked={selectedAllRecords}
                          size="small"
                          indeterminate={selectedSomeRecords}
                          onChange={onSelectAllRecords}
                        />
                      </TableCell>
                    )}
                    {columns
                      .filter((f) => !f.hidden)
                      .map((col, index) => {
                        if (col.field === "rowNumber") {
                          return (
                            <TableCell
                              align="center"
                              key={`col-${index}`}
                              size="small"
                              variant="head"
                              style={{ width: col?.width ?? "auto" }}
                            >
                              <Typography component="span">#</Typography>
                            </TableCell>
                          );
                        }
                        return (
                          <Draggable
                            key={col.field}
                            draggableId={col.field}
                            index={index}
                            isDragDisabled={false}
                          >
                            {(provided, snapshot) => (
                              <Tooltip
                                title={
                                  <Typography
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "lighter",
                                    }}
                                  >
                                    {col.field.replaceAll('"', "")}
                                  </Typography>
                                }
                                //disableHoverListener={(((dataItemLength || 0) * 12 - 65) < col.width)}
                              >
                                <TableCell
                                  align="center"
                                  key={`col-${index}`}
                                  size="small"
                                  variant="head"
                                  style={{ width: col?.width ?? "auto" }}
                                >
                                  <TableSortLabel
                                    active={
                                      sort[0] &&
                                      sort[0].columnName === col.field
                                    }
                                    direction={sort[0] && sort[0].direction}
                                    onClick={() =>
                                      handleSort(`${col.field}|desc`)
                                    }
                                    style={{ display: "flex" }}
                                  >
                                    <Box
                                      style={{
                                        display: "flex",
                                        ...getItemStyle(
                                          snapshot.isDragging,
                                          provided.draggableProps.style
                                        ),
                                      }}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <Typography component="span">
                                        {col.field.replaceAll('"', "")}
                                      </Typography>
                                    </Box>
                                  </TableSortLabel>
                                  <div
                                    onMouseDown={() =>
                                      onClickResizeColumn(index)
                                    }
                                    ref={columnRefs[index]}
                                  />
                                </TableCell>
                              </Tooltip>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </TableRow>
                )}
              </Droppable>
            </DragDropContext>
          </TableHead>
          <TableBody>
            {!hideFilters && (
              <TableRow style={{ position: "sticky", top: 33 }}>
                {anableSelectRows && (
                  <TableCell
                    key={`col-filter-checkbox`}
                    size="small"
                    component="div"
                    variant="head"
                    padding="none"
                  ></TableCell>
                )}
                {columns
                  .filter((f) => !f.hidden)
                  .map((col, index) => {
                    if (col.field === "rowNumber") {
                      return (
                        <TableCell
                          align="center"
                          key={index}
                          size="small"
                          padding="normal"
                          variant="body"
                        >
                          {/* {col.renderCell({ rowIndex: indexRow * page})} */}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell
                        key={`col-filter-${index}`}
                        size="small"
                        component="div"
                        variant="head"
                        padding="none"
                      >
                        <Filter
                          columnType={col.type}
                          filterValue={
                            filter &&
                            filter.find((f) => f.columnName === col.field)
                              .filterText
                          }
                          filterTypeValue={
                            filter &&
                            filter.find((f) => f.columnName === col.field)
                              .filterType
                          }
                          onChange={handleFilter}
                          clearFilter={props.clearFilter}
                          columnName={col.field}
                          clearDisabled={
                            (filter &&
                              filter.find((f) => f.columnName === col.field)
                                .filterText !== "") ||
                            (filter &&
                              ["IS NULL", "IS NOT NULL", "EMPTY"].includes(
                                filter.find((f) => f.columnName === col.field)
                                  .filterType
                              ))
                          }
                          filterOptions={filterOptions}
                        />
                      </TableCell>
                    );
                  })}
              </TableRow>
            )}
            {innerRows &&
              innerRows.map((record, indexRow) => {
                const isSelected = selectedRecords.includes(record.EX_ID);

                const actualRowIndex = page * limit + indexRow; //+ 1;
                //make the row key upper case in order to make it generic
                return (
                  <TableRow
                    hover
                    key={indexRow}
                    onDoubleClick={() => onRowDoubleClick(record)}
                  >
                    {anableSelectRows && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) =>
                            onSelectOneRecord(event, record.EX_ID)
                          }
                          size="small"
                          value={isSelected}
                        />
                      </TableCell>
                    )}
                    {columns
                      .filter((f) => !f.hidden)
                      .map((col, index) => {
                        let dataItem =
                          record[
                            col.field &&
                              col.field.replaceAll('"', "").toUpperCase()
                          ];
                        let dataItemLength = dataItem?.length;

                        if (col.field === "rowNumber") {
                          return (
                            <TableCell
                              align="center"
                              key={index}
                              size="small"
                              padding="normal"
                              variant="body"
                            >
                              {col.renderCell({ rowIndex: actualRowIndex })}
                            </TableCell>
                          );
                        }

                        return (
                          <Tooltip
                            title={
                              <Typography
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "lighter",
                                }}
                              >
                                {dataItem}
                              </Typography>
                            }
                            disableHoverListener={
                              (dataItemLength || 0) * 12 - 65 < col.width
                            }
                          >
                            <TableCell
                              key={index}
                              size="small"
                              padding="normal"
                              variant="body"
                              onContextMenu={(e) => copyCellValue(e, dataItem)}
                            >
                              <Typography>{dataItem}</Typography>
                            </TableCell>
                          </Tooltip>
                        );
                      })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          style={{
            backgroundColor: "red",
            left: 0,
            bottom: 0,
            zIndex: 2,
            width: actualTableWidth,
            position: "absolute",
            background: "inherit",
          }}
          count={totalRowsCountUpdated}
          onPageChange={onPageChange}
          onRowsPerPageChange={onLimitChange}
          page={page}
          labelRowsPerPage="ROWS PER PAGE"
          labelDisplayedRows={({ from, to, count }) => (
            <span
              style={{
                textAlign: "start",
                display: "inline-block",
                direction: "ltr",
              }}
            >
              {count !== undefined
                ? `${from}-${to} FROM - ${count}`
                : "0-0 FROM - 0"}
            </span>
          )}
          rowsPerPage={limit}
          rowsPerPageOptions={[100, 250, 500, 1000]}
        />
      </TableContainer>
    </Box>
  );
};

export default React.memo(PaginationTable);
