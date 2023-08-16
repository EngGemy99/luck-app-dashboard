import { Box, Button } from "@mui/material";
export const PendingColumns = [
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
    flex: 0.5,
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
    flex: 2,
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
          <Button
            variant="contained"
            color="success"
            sx={{
              mr: ".5rem",
            }}
            onClick={() => {
              console.log("Accepted");
            }}
          >
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
export const AcceptedColumns = [
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
];
export const RejectedColumns = [
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
];
