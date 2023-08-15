import { Box, Button, Typography } from "@mui/material";

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
    field: "action",
    headerName: "Action",
    flex: 1,
    align: "center",
    headerAlign: "center",
    renderCell: ({ row: { access } }) => {
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
          <Button variant="contained">View</Button>
        </Box>
      );
    },
  },
];

export { columns };
