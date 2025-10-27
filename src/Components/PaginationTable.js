// import { TablePagination } from '@mui/base';

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export default function ReportsTable() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "שם דו\"ח", width: 200 },
    { field: "date", headerName: "תאריך", width: 150 },
    { field: "status", headerName: "סטטוס", width: 120 },
  ];

  React.useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}TrafficReports/GetBIReports`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ Page: 0, RowsPerPage: 100 }),
          }
        );
        const data = await response.json();
        const formatted = data.result?.map((item, i) => ({
          id: i + 1,
          name: item.ReportName,
          date: item.Date,
          status: item.Status,
        }));
        setRows(formatted || []);
      } catch (err) {
        console.error("❌ failed to fetch reports", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        pagination
        loading={loading}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
