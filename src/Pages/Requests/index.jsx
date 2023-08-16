import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import LukeApp from "../../Api/config";
import { DataGrid } from "@mui/x-data-grid";
function Requests() {
  const [rows, setRows] = useState([]);
  const getAllRequest = async () => {
    const { data } = await LukeApp.get(`request?status=pending`);
    setRows(data.requests);
  };
  useEffect(() => {
    getAllRequest();
  }, []);

  console.log(rows);
  const columns = [
    {
      field: "user.username",
      headerName: "User Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => params.row?.user?.userName,
    },
    {
      field: "paymentName",
      headerName: "Payment Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "paymentWay",
      headerName: "Payment Way",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => {
        const isEmail = params.row?.email?.includes("@");
        if (isEmail) {
          return params.row.email;
        } else {
          return params.row.phone;
        }
      },
    },
    {
      field: "countPoint",
      headerName: "Count Point",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "requestedAt",
      headerName: "Date",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => {
        const dateObject = new Date(params.row.requestedAt);
        const readableDate = `${
          dateObject.getMonth() + 1
        }/${dateObject.getDate()}/${dateObject.getFullYear()}`;
        return readableDate;
      },
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Button variant="contained" color="success">
              Accept
            </Button>
            <Button variant="contained" color="error">
              Reject
            </Button>
          </Box>
        );
      },
    },
  ];
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Pending" {...a11yProps(0)} />
        <Tab label="Accepted" {...a11yProps(1)} />
        <Tab label="Rejected" {...a11yProps(2)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <Paper
          sx={{
            p: 4,
          }}
        >
          <Box sx={{ height: 650, width: "98%" }}>
            <DataGrid
              getRowId={(row) => row._id}
              rows={rows}
              columns={columns}
            />
          </Box>
        </Paper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Paper
          sx={{
            p: 4,
          }}
        >
          <Box sx={{ height: 650, width: "98%" }}>
            <DataGrid
              getRowId={(row) => row._id}
              rows={rows}
              columns={columns}
            />
          </Box>
        </Paper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Paper
          sx={{
            p: 4,
          }}
        >
          <Box sx={{ height: 650, width: "98%" }}>
            <DataGrid
              getRowId={(row) => row._id}
              rows={rows}
              columns={columns}
            />
          </Box>
        </Paper>
      </CustomTabPanel>
    </>
  );
}

export default Requests;
