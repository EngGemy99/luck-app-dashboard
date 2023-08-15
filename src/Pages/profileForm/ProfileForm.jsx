import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, Grid, MenuItem, Snackbar } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
function ProfileForm() {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const onSubmit = (data) => {
    handleClick();
  };

  const handleClick = () => {
    setOpen(true);
  };

  const data = [
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Manger",
      label: "Manger",
    },
    {
      value: "User",
      label: "User",
    },
  ];
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={5}>
        <Grid item sm={6}>
          <TextField
            error={errors.firstName}
            helperText={errors.firstName?.message}
            {...register("firstName")}
            fullWidth
            label="First Name"
            variant="filled"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            error={errors.lastName}
            helperText={errors.lastName?.message}
            {...register("lastName")}
            fullWidth
            label="Last Name"
            variant="filled"
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            error={errors.email}
            helperText={errors.email?.message}
            {...register("email")}
            label="Emails"
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            fullWidth
            error={errors.phone}
            helperText={errors.phone?.message}
            {...register("phone")}
            label="Phone"
            variant="filled"
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            fullWidth
            error={errors.address}
            helperText={errors.address?.message}
            {...register("address")}
            label="Address"
            variant="filled"
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            id="outlined-select-currency"
            select
            label="Role"
            fullWidth
            defaultValue="User"
            variant="filled"
            error={errors.role}
            helperText={errors.role?.message}
            {...register("role")}
          >
            {data.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid
          item
          sm={12}
          sx={{
            textAlign: "end",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              color: "#fff",
            }}
          >
            Create New User
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              This is a success message!
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfileForm;
