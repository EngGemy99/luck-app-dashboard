import { useParams } from "react-router-dom";

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
import React, { useEffect } from "react";
import { Stack } from "@mui/system";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
function UserDetails() {
  const { id } = useParams();

  const handleStatus = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
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
              User
            </Typography>
            <Typography variant="body2" color="text.secondary">
              User@gamil.com
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
              label="Username"
              fullWidth
              variant="outlined"
              disabled
              value="ahemd jamal"
              sx={{
                mb: 3,
              }}
            />
            <TextField
              label="email"
              fullWidth
              variant="outlined"
              disabled
              value="ahemdjamal@gamil.com"
              sx={{
                mb: 3,
              }}
            />
            <TextField
              label="points"
              fullWidth
              variant="outlined"
              disabled
              value="30"
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
                  type="submit"
                >
                  delete user
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    handleStatus();
                  }}
                >
                  block user
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default UserDetails;
