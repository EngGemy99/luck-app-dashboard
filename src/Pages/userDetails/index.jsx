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
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import LukeApp from "../../Api/config";
import { editAllUsers, editStatus } from "../../store/Slices/userSlice";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "250px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};
function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.user?.allUsers?.find((value) => value._id == id);
  });
  const [status, setStatus] = useState(user?.status);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditPoint = () => {
    console.log("aa");
    handleClose();
  };
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
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await LukeApp.delete(`/admin/${user._id}/delete`);
        dispatch(editAllUsers(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        navigate(-1);
      }
    });
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

  return (
    <>
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
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleOpen}
                >
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
      {/* Add Point Model */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add Point
            </Typography>
            <Divider />
            <TextField
              sx={{
                my: 3,
              }}
              autoFocus
              margin="dense"
              id="name"
              label="point"
              type="number"
              fullWidth
            />
            <Button
              onClick={handleEditPoint}
              variant="contained"
              color="success"
            >
              Add
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default UserDetails;
