import { Box, Button } from "@mui/material";
export const accepted = [
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
];
export const rejected = [
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
  //   {
  //     field: "Action",
  //     headerName: "Action",
  //     align: "center",
  //     headerAlign: "center",
  //     minWidth: 150,
  //     flex: 1,
  //     renderCell: ({ row }) => {
  //       return (
  //         <Box
  //           sx={{
  //             display: "flex",
  //             alignItems: "center",
  //             flexDirection: "column",
  //             gap: 1,
  //           }}
  //         >
  //           {row.status == "pending" && (
  //             <Button
  //               onClick={() => changeStatus(row._id, "accepted")}
  //               variant="contained"
  //               color="success"
  //             >
  //               Accept
  //             </Button>
  //           )}

  //           {row.status == "pending" && (
  //             <Button
  //               onClick={() => changeStatus(row._id, "rejected")}
  //               variant="contained"
  //               color="error"
  //             >
  //               Reject
  //             </Button>
  //           )}
  //           {row.status == "accepted" && (
  //             <Button
  //               onClick={() => changeStatus(row._id, "pending")}
  //               variant="contained"
  //               color="primary"
  //             >
  //               Track
  //             </Button>
  //           )}
  //           {row.status == "rejected" && (
  //             <Button
  //               onClick={() => changeStatus(row._id, "pending")}
  //               variant="contained"
  //               color="primary"
  //             >
  //               Change To Pending
  //             </Button>
  //           )}
  //         </Box>
  //       );
  //     },
  //   },
];
