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
import { useDispatch, useSelector } from "react-redux";
import { editRequestStatus } from "../../store/Slices/userSlice";
import { accepted, rejected } from "./data";
import Swal from "sweetalert2";
function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((state) => {
    return state.user?.requests;
  });

  const changeStatus = async (requestID, status) => {
    try {
      if (status === "rejected") {
        const result = await Swal.fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        });
        if (result.isConfirmed) {
          await LukeApp.patch(`/request/${requestID}`, {
            status,
          });
          dispatch(editRequestStatus({ _id: requestID, status }));
          await Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      } else {
        await LukeApp.patch(`/request/${requestID}`, {
          status,
        });
        dispatch(editRequestStatus({ _id: requestID, status }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      field: "user.username",
      headerName: "User Name",
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => params.row?.user?.userName,
      minWidth: 80,
      flex: 1,
    },
    {
      field: "paymentName",
      headerName: "Payment Name",

      align: "center",
      headerAlign: "center",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "paymentWay",
      headerName: "Payment Way",
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      flex: 1,
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
      align: "center",
      headerAlign: "center",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "requestedAt",
      headerName: "Date",
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      flex: 1,
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
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {row.status == "pending" && (
              <Button
                onClick={() => changeStatus(row._id, "accepted")}
                variant="contained"
                color="success"
              >
                Accept
              </Button>
            )}

            {row.status == "pending" && (
              <Button
                onClick={() => changeStatus(row._id, "rejected")}
                variant="contained"
                color="error"
              >
                Reject
              </Button>
            )}
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
          <Box sx={{ height: 650, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row._id}
              rows={requests.filter((value) => value.status == "pending")}
              columns={columns}
              rowHeight={100}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
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
          <Box sx={{ height: 650, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row._id}
              rows={requests.filter((value) => value.status == "accepted")}
              columns={accepted}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
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
          <Box sx={{ height: 650, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row._id}
              rows={requests.filter((value) => value.status == "rejected")}
              columns={rejected}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
          </Box>
        </Paper>
      </CustomTabPanel>
    </>
  );
}

export default Requests;
