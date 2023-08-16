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
import { PendingColumns, AcceptedColumns, RejectedColumns } from "./data";
function Requests() {
  const [rows, setRows] = useState([]);
  const getAllRequest = async () => {
    const { data } = await LukeApp.get(`request?status=pending`);
    setRows(data.requests);
  };
  useEffect(() => {
    getAllRequest();
  }, []);

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
              columns={PendingColumns}
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
              columns={AcceptedColumns}
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
              columns={RejectedColumns}
            />
          </Box>
        </Paper>
      </CustomTabPanel>
    </>
  );
}

export default Requests;
