import React, { useEffect, useState, useCallback } from "react";
import PaginationTable from "./PaginationTable";
import ColumnsDisplaySelector from "./ColumnsDisplaySelector";
import { useSelector, useDispatch } from "react-redux";
import PaginationTableToolbar from "./PaginationTableToolbar";
import SimplePopover from "../UI/SimplePopover";
import { useSettings } from "../../Hooks/useSettings";
import { dataSourceActions } from "../../store/PaginationTable-Slices/dataSource-slice";
import {
  LinearProgress,
  Box,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import { exportToExcel, exportToCsv, getBIReports } from "../../Utils/Api";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Filter from "./Filter";

const PaginationTableContainer = (props) => {
  const {
    dataFunctionName,
    onRowDoubleClick,
    exceptionId,
    excelFileName,
    url,
    unHiddenColumns = [],
    anableSelectRows,
    bulkOperation,
    tableHeight,
    refresh,
  } = props;

  const tableState =
    useSelector((state) => state.dataSource?.[dataFunctionName]) || {};

  const {
    page = 0,
    limit = 100,
    filter = [],
    sort = [],
    totalRows = 0,
    hideFilters = false,
    tableColumns = [],
    excelFileName: efn = "",
    prevExId = null,
  } = tableState;

  const user = useSelector((state) => state.userAccount.user);

  const [innerRows, setInnerRows] = useState([]);
  const [columns, setColumns] = useState(null);
  const [filterOptions, setFilterOptions] = useState(null);
  const [totalRowsCount, setTotalRowsCount] = useState(0);
  const [innerFilter, setInnerFilter] = useState(filter);
  const [selectedAllRecords, setSelectedAllRecords] = useState(false);
  const [selectedRecords, setSelectedRecord] = useState([]);
  const [excludeRecords, setExcludeRecord] = useState([]);
  const [includeRecord, setIncludeRecord] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExcel, setIsLoadingExcel] = useState(false);
  const [isLoadingCsv, setIsLoadingCsv] = useState(false);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [biFilters, setBiFilters] = useState([]);

  const DEFAULT_MIN_WIDTH_CELL = 120;
  const dispatch = useDispatch();

  function calculateWordWidth(word, fontSize, fontFamily) {
    //const offset = 6;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = `${fontSize}px ${fontFamily}`;
    const metrics = context.measureText(word);
    //return metrics.width + (offset * word?.length);
    return metrics.width + 22 + 16; //22 is the size and padding of the sort icon and 16 is the padding of the whole field
  }

  useEffect(() => {
    if (prevExId !== exceptionId) {
      clearSort();
      dispatch(
        dataSourceActions.updateSliceValue({
          tableName: dataFunctionName,
          key: "prevExId",
          value: exceptionId,
        })
      );
    }
  }, [prevExId]);

  useEffect(() => {
    const fetchReports = async () => {
      const data = await getBIReports();
      setReports(data || []);
    };
    fetchReports();
  }, []);

  const handleSelectReport = (report) => {
    setSelectedReport(report);

    if (!report?.biReportParameters) {
      setBiFilters([]);
      return;
    }

    try {
      const cleanParams = report.biReportParameters
        .replace(/^'|'$/g, "")
        .replace(/(\w+):/g, '"$1":')
        .replace(/: (\w+)/g, ': "$1"');

      const parsed = JSON.parse(cleanParams);
      setBiFilters(parsed);

      console.log("✅ Parsed BI Filters:", parsed);
    } catch (err) {
      console.error("❌ Failed to parse BI parameters:", err);
      setBiFilters([]);
    }
  };

  const clearSort = () => {
    dispatch(
      dataSourceActions.updateSliceValue({
        tableName: dataFunctionName,
        key: "sort",
        value: [],
      })
    );
  };

  useEffect(() => {
    if (columns) {
      const _ = require("lodash");
      const oldColumns = Object.assign(
        {},
        ...tableColumns.map((item) => ({ [item.field]: item.type }))
      );
      const areEqual = _.isEqual(columns, oldColumns);
      if (!areEqual) {
        const tc = Object.keys(columns).map((item, index) => {
          // let fieldLength = item.length * 12;
          // let colWidth = fieldLength > 140 ? fieldLength : 140
          let fieldLength = calculateWordWidth(item, 14.8, "Roboto");
          //let fieldLength = calculateWordWidth(item, 15.8, 'Roboto');
          let colWidth =
            fieldLength > DEFAULT_MIN_WIDTH_CELL
              ? fieldLength
              : DEFAULT_MIN_WIDTH_CELL;

          return {
            field: item,
            width: colWidth,
            type: columns[item],
            hidden: false,
            order: index,
            anableHideColumn: unHiddenColumns.includes(item) ? false : true,
          };
        });
        const ftr = Object.keys(columns).map((item) => {
          return {
            columnName: item,
            filterText: "",
            filterType: "CONTAINS",
          };
        });

        dispatch(
          dataSourceActions.updateSliceValue({
            tableName: dataFunctionName,
            key: "tableColumns",
            value: tc,
          })
        );

        clearSort();

        dispatch(
          dataSourceActions.updateSliceValue({
            tableName: dataFunctionName,
            key: "filter",
            value: ftr,
          })
        );

        setInnerFilter(ftr);
      }
    }
  }, [columns]);

  useEffect(() => {
    dispatch(
      dataSourceActions.updateSliceValue({
        tableName: dataFunctionName,
        key: "totalRows",
        value: totalRowsCount,
      })
    );
  }, [totalRowsCount, dataFunctionName]);

  useEffect(() => {
    //TODO think about clear filter and column here
    dispatch(
      dataSourceActions.updateSliceValue({
        tableName: dataFunctionName,
        key: "excelFileName",
        value: excelFileName,
      })
    );
  }, [excelFileName, dataFunctionName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      DataHandler();
    }, 500);

    return () => clearTimeout(timer);
  }, [page, limit, refresh]);

  useEffect(() => {
    let timerId;

    // Debounce the filter update by setting a timer
    // that will update the state after a short delay
    const updateFilter = () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        dispatch(
          dataSourceActions.updateSliceValue({
            tableName: dataFunctionName,
            key: "filter",
            value: innerFilter,
          })
        );
      }, 50);
    };

    updateFilter();

    return () => {
      clearTimeout(timerId);
    };
  }, [innerFilter]);

  const reorderColumnsHandler = (startIndex, endIndex) => {
    const result = [
      ...tableColumns.filter((f) => !f.hidden && f.field !== "rowNumber"),
    ];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    const columns = [...result, ...tableColumns.filter((f) => f.hidden)];

    dispatch(
      dataSourceActions.updateSliceValue({
        tableName: dataFunctionName,
        key: "tableColumns",
        value: columns,
      })
    );
  };

  const handleColumnHidePopoverClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  const handleColumnHideToggle = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onPageChange = (event, page) => {
    dispatch(
      dataSourceActions.updateSliceValue({
        tableName: dataFunctionName,
        key: "page",
        value: page,
      })
    );
  };

  const onLimitChange = (event) => {
    const limit = event.target.value;
    dispatch(
      dataSourceActions.updateSliceValue({
        tableName: dataFunctionName,
        key: "limit",
        value: limit,
      })
    );
  };

  const handleSort = (sorts) => {
    let columnName = sorts.split("|")[0];
    let direction = sorts.split("|")[1];
    if (sort.length > 0 && columnName === sort[0].columnName) {
      direction = sort[0].direction === "asc" ? "desc" : "asc";
    } else {
      direction = "desc";
    }

    dispatch(
      dataSourceActions.updateSliceValue({
        tableName: dataFunctionName,
        key: "sort",
        value: [{ columnName, direction }],
      })
    );
  };

  const handleFilter = (filterValue, filterType, columnName) => {
    let temp = filter.map((f) => {
      if (f.columnName === columnName) {
        return {
          ...f,
          filterText: filterValue,
          filterType: filterType,
        };
      }
      return f;
    });
    setInnerFilter(temp);
    dispatch(
      dataSourceActions.updateSliceValue({
        tableName: dataFunctionName,
        key: "page",
        value: 0,
      })
    );
  };

  const clearFilter = (event, columnName) => {
    let temp = filter.map((f) => {
      if (f.columnName === columnName) {
        return {
          ...f,
          filterText: "",
          //filterType: 'CONTAINS'
        };
      }
      return f;
    });

    setInnerFilter(temp);
    dispatch(
      dataSourceActions.updateSliceValue({
        tableName: dataFunctionName,
        key: "filter",
        value: temp,
      })
    );
  };

  const handleClearAllFilters = () => {
    let temp = filter.map((f) => {
      return {
        ...f,
        filterText: "",
        filterType: "CONTAINS",
      };
    });

    setInnerFilter(temp);
    dispatch(
      dataSourceActions.updateSliceValue({
        tableName: dataFunctionName,
        key: "filter",
        value: temp,
      })
    );
  };

  const getDataSource = () => {
    let filterDictionary = {};
    let sortDictionary = {};

    if (efn === excelFileName) {
      filterDictionary = Object.assign(
        {},
        ...filter.map((x) => ({
          [x.columnName]: `${x.filterText}|${x.filterType}`,
        }))
      );
      sortDictionary = Object.assign(
        {},
        ...sort.map((x) => ({ [x.columnName]: x.direction }))
      );
    }

    let dataSource = {
      Page: page,
      RowsPerPage: limit,
      Filters: filterDictionary,
      Sorts: sortDictionary,
      CustomerId: user?.customerId ?? null,
      exceptionId: exceptionId ?? 0,
    };
    return dataSource;
  };

  const DataHandler = useCallback(async () => {
    setIsLoading(true);
    // const dataSource = getDataSource();
    // const token = localStorage.getItem("token");

    try {
      console.log("🚫 Skipping server call. Using mock data instead.");

      const data = [
        { ID: 1, Name: "Example Row 1", Value: 42 },
        { ID: 2, Name: "Example Row 2", Value: 17 },
        { ID: 3, Name: "Example Row 3", Value: 99 },
      ];

      let rows = [];
      let columns = {};
      let totalRowsCount = 0;

      if (Array.isArray(data)) {
        rows = data;
      } else if (data && typeof data === "object") {
        rows = [data];
      } else {
        rows = [];
      }

      if (rows.length > 0) {
        const firstRow = rows[0];
        columns = Object.keys(firstRow).reduce((acc, key) => {
          acc[key] = typeof firstRow[key];
          return acc;
        }, {});
      }
      totalRowsCount = rows.length;
      setInnerRows(rows);
      setColumns(columns);
      setTotalRowsCount(totalRowsCount);
    } catch (err) {
      console.error("❌ DataHandler failed:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const exportToExcelHandler = async () => {
    try {
      setIsLoadingExcel(true);
      const token = localStorage.getItem("token");
      await exportToExcel(
        getDataSource(),
        dataFunctionName,
        token,
        exceptionId,
        excelFileName
      );
    } catch (err) {
      console.error("❌ Excel export failed:", err);
    } finally {
      setIsLoadingExcel(false);
    }
  };

  const exportToCsvHandler = async () => {
    try {
      setIsLoadingCsv(true);
      const token = localStorage.getItem("token");
      await exportToCsv(
        getDataSource(),
        dataFunctionName,
        token,
        exceptionId,
        excelFileName
      );
    } catch (err) {
      console.error("❌ CSV export failed:", err);
    } finally {
      setIsLoadingCsv(false);
    }
  };

  const hideFilterHandler = () => {
    dispatch(
      dataSourceActions.updateSliceValue({
        tableName: dataFunctionName,
        key: "hideFilters",
        value: !hideFilters,
      })
    );
    !hideFilters && handleClearAllFilters();
  };

  const onColumnDisplayToggleSelected = (col) => {
    let temp = tableColumns.map((f) => {
      if (f.field === col.field) {
        return {
          ...f,
          hidden: !col.hidden,
        };
      }
      return f;
    });

    dispatch(
      dataSourceActions.updateSliceValue({
        tableName: dataFunctionName,
        key: "tableColumns",
        value: [...temp],
      })
    );
  };

  const onColumnWidthChanged = (columnWidthList) => {
    let cols = tableColumns.map((col, index) => {
      if (col.field === Object.keys(columnWidthList)[index]) {
        let width = +columnWidthList[col.field].replace("px", "");
        width = parseInt(width);
        return {
          ...col,
          width,
        };
      } else {
        return {
          ...col,
        };
      }
    });

    dispatch(
      dataSourceActions.updateSliceValue({
        tableName: dataFunctionName,
        key: "tableColumns",
        value: cols,
      })
    );
  };

  const resetDataSource = () => {
    dispatch(
      dataSourceActions.resetDataSource({
        tableName: dataFunctionName,
      })
    );
  };

  const onSelectAllRecords = (event) => {
    setSelectedAllRecords((prev) => !prev);
    setSelectedRecord(
      event && event.target.checked
        ? innerRows.map((record) => record.EX_ID)
        : []
    );
    setIncludeRecord([]);
    setExcludeRecord([]);
  };

  useEffect(() => {
    if (selectedAllRecords) {
      setSelectedRecord(innerRows.map((record) => record.EX_ID));
    }
  }, [innerRows, selectedAllRecords]);

  const onSelectOneRecord = (event, recordId) => {
    if (!selectedRecords.includes(recordId)) {
      //add record
      setSelectedRecord((prevSelected) => [...prevSelected, recordId]);
    } else {
      //remove record
      setSelectedRecord((prevSelected) =>
        prevSelected.filter((ex_id) => ex_id !== recordId)
      );
    }
    if (event.target.checked) {
      //add record

      if (selectedAllRecords && excludeRecords.includes(recordId)) {
        setExcludeRecord((prevSelected) =>
          prevSelected.filter((ex_id) => ex_id !== recordId)
        );
      } else {
        setIncludeRecord((prevSelected) => [...prevSelected, recordId]);
      }
    } else {
      //remove record
      if (selectedAllRecords) {
        setExcludeRecord((prevSelected) => [...prevSelected, recordId]);
      }
      setIncludeRecord((prevSelected) =>
        prevSelected.filter((ex_id) => ex_id !== recordId)
      );
    }
  };
  // const selectedSomeRecords =
  //     selectedRecords.length > 0 && selectedRecords.length < innerRows.length;
  //const selectedAllRecords = selectedRecords.length === innerRows.length;
  // const showTable = tableColumns && tableColumns.length > 0;
  const showTable = columns && Object.keys(columns).length > 0;

  //console.log('filterOptions', filterOptions)
  return (
    <>
      {showTable ? (
        <Box>
          <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <Autocomplete
              size="small"
              options={reports}
              getOptionLabel={(r) => r.biReportDesc || ""}
              value={selectedReport}
              onChange={(e, value) => handleSelectReport(value)}
              renderInput={(params) => (
                <TextField {...params} label="בחר דוח BI" variant="outlined" />
              )}
              sx={{ width: 350 }}
            />

            {selectedReport && (
              <Typography variant="body2" color="text.secondary">
                {selectedReport.biReportName}
              </Typography>
            )}
          </Box>
          {biFilters.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mb: 2,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
                backgroundColor: "#fafafa",
              }}
            >
              {biFilters.map((param, idx) => {
                const value =
                  innerFilter.find((f) => f.columnName === param.ParameterName)
                    ?.filterText || "";
                if (param.Type === "DATETIME") {
                  return (
                    <TextField
                      key={idx}
                      label={param.ParameterName}
                      type="datetime-local"
                      value={value}
                      onChange={(e) =>
                        handleFilter(
                          e.target.value,
                          "CONTAINS",
                          param.ParameterName
                        )
                      }
                      size="small"
                      sx={{ width: 250 }}
                    />
                  );
                }

                if (param.Type === "INT") {
                  return (
                    <TextField
                      key={idx}
                      label={param.ParameterName}
                      type="number"
                      value={value}
                      onChange={(e) =>
                        handleFilter(
                          e.target.value,
                          "CONTAINS",
                          param.ParameterName
                        )
                      }
                      size="small"
                      sx={{ width: 200 }}
                    />
                  );
                }

                return (
                  <TextField
                    key={idx}
                    label={param.ParameterName}
                    type="text"
                    value={value}
                    onChange={(e) =>
                      handleFilter(
                        e.target.value,
                        "CONTAINS",
                        param.ParameterName
                      )
                    }
                    size="small"
                    sx={{ width: 200 }}
                  />
                );
              })}
            </Box>
          )}

          <PaginationTableToolbar
            exportToExcel={exportToExcelHandler}
            exportToCsv={exportToCsvHandler}
            hideFilters={hideFilters}
            setHideFilters={hideFilterHandler}
            handleColumnHideToggle={handleColumnHideToggle}
            handleClearAllFilters={handleClearAllFilters}
            resetDataSource={resetDataSource}
            anableSelectRows={anableSelectRows}
            bulkOperation={bulkOperation}
            includeIds={includeRecord}
            excludeIds={excludeRecords}
            selectedRecords={selectedRecords}
            setSelectedRecord={setSelectedRecord}
            setSelectedAllRecords={setSelectedAllRecords}
          />
          <ThemeProvider theme={createTheme()}>
            <PaginationTable
              clearFilter={clearFilter}
              handleFilter={handleFilter}
              handleSort={handleSort}
              onLimitChange={onLimitChange}
              onPageChange={onPageChange}
              innerRows={innerRows}
              totalRowsCountUpdated={totalRows}
              filter={innerFilter}
              reorderColumnsHandler={reorderColumnsHandler}
              isLoading={isLoading || isLoadingExcel || isLoadingCsv}
              onRowDoubleClick={onRowDoubleClick}
              onColumnWidthChanged={onColumnWidthChanged}
              dataFunctionName={dataFunctionName}
              anableSelectRows={anableSelectRows}
              selectedRecords={selectedRecords}
              selectedAllRecords={selectedAllRecords}
              setSelectedRecord={setSelectedRecord}
              onSelectAllRecords={onSelectAllRecords}
              setSelectedAllRecords={onSelectOneRecord}
              onSelectOneRecord={onSelectOneRecord}
              filterOptions={filterOptions}
              tableHeight={tableHeight}
            />
          </ThemeProvider>

          <SimplePopover
            open={open}
            anchorEl={anchorEl}
            handleClose={handleColumnHidePopoverClose}
            anchorTop={"top"}
          >
            <ColumnsDisplaySelector
              dataFunctionName={dataFunctionName}
              onColumnDisplayToggleSelected={onColumnDisplayToggleSelected}
            />
          </SimplePopover>
        </Box>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              zIndex: 100000,
              position: "absolute",
              width: 400,
              top: 400,
            }}
          >
            <LinearProgress />
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(PaginationTableContainer);
