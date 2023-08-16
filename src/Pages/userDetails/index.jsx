import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import LukeApp from "../../Api/config";
import { editAllUsers, editStatus } from "../../store/Slices/userSlice";
function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.user?.Allusers?.find((value) => value._id == id);
  });
  const [status, setStatus] = useState(user?.status);
  const dispatch = useDispatch();

  const handleStatus = (statusReverse) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        blockUser(statusReverse);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const deleteUser = async () => {
    try {
      await LukeApp.delete(`/admin/${user._id}/delete`);
      dispatch(editAllUsers(id));
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  const blockUser = async (statusReverse) => {
    try {
      await LukeApp.patch(`/admin/${user._id}/edit-status`, {
        status: statusReverse,
      });
      dispatch(editStatus(id));
      if (status == "blocked") {
        setStatus("active");
      } else setStatus("blocked");
    } catch (error) {
      console.log(error);
    }
  };

  // const blockUser = async () => {
  //   const { data } = await LukeApp.get(`admin`);
  //   // dispatch(addAllUsers(data.users))
  // };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            py: "2rem",
          }}
        >
          <CardMedia
            component="img"
            height="150"
            image={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDtd0soCSRdpo8Y5klekJdABh4emG2P29jwg&usqp=CAU"
            }
            alt="Profile picture"
            sx={{
              width: " 150px",
              margin: "auto",
              borderRadius: "50%",
            }}
          />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography gutterBottom variant="h5" component="div">
              {user?.userName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper
          sx={{
            p: 4,
          }}
        >
          <form>
            <TextField
              label="User Name"
              fullWidth
              variant="outlined"
              disabled
              value={user?.userName}
              sx={{
                mb: 3,
              }}
            />
            <TextField
              label="email"
              fullWidth
              variant="outlined"
              disabled
              value={user?.email}
              sx={{
                mb: 3,
              }}
            />
            <TextField
              label="points"
              fullWidth
              variant="outlined"
              disabled
              value={user?.points}
              sx={{
                mb: 3,
              }}
            />

            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="success" type="submit">
                add point
              </Button>
              <Box sx={{ textAlign: "right", flex: "1" }}>
                <Button
                  sx={{ mr: 1 }}
                  variant="contained"
                  color="error"
                  onClick={deleteUser}
                >
                  delete user
                </Button>
                {status == "active" ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleStatus("blocked");
                    }}
                  >
                    Block user
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      handleStatus("active");
                    }}
                  >
                    active user
                  </Button>
                )}
              </Box>
            </Stack>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default UserDetails;
