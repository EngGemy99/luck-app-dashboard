import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import LukeApp from "../../Api/config";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAllUsers } from "../../store/Slices/userSlice";
// import { columns } from "./data";
function Team() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const Allusers = useSelector((state) => {
    return state.user?.Allusers;
  });

  const columns = [
    {
      field: "userName",
      headerName: "UserName",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "points",
      headerName: "Points",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            sx={{
              color: "#fff",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              p: "5px",
              width: "99px",
              borderRadius: "5px",
              textAlign: "center",
              cursor: "pointer",
              background: status === "active" ? "#028402" : "#6a0707",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: 17,
              }}
            >
              {status}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "_id",
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { _id } }) => {
        return (
          <Box
            sx={{
              color: "#fff",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              p: "5px",
              width: "99px",
              borderRadius: "5px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <Button variant="contained">
              <Link
                to={`/team/${_id}`}
                style={{
                  color: "#fff",
                }}
              >
                View
              </Link>
            </Button>
          </Box>
        );
      },
    },
  ];
  const [rows, setRows] = useState([]);
  const getAllUsers = async () => {
    const { data } = await LukeApp.get(`admin`);
    dispatch(addAllUsers(data.users));
  };
  useEffect(() => {
    if (Allusers.length == 0) {
      getAllUsers();
    }
  }, []);

  return (
    <Box sx={{ height: 650, width: "98%" }}>
      <DataGrid rows={Allusers} columns={columns} />
    </Box>
  );
}

export default Team;
