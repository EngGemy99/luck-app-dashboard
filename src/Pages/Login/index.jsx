import { Paper, TextField, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { schema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import LukeApp from "../../Api/config";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const { data } = await LukeApp.post("/login", formData);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4} sx={{ m: "auto" }}>
        <Paper elevation={3} sx={{ padding: "20px" }}>
          <Typography
            variant="h5"
            color="initial"
            sx={{
              mb: "2rem",
              textAlign: "center",
            }}
          >
            Admin Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              error={errors.userName}
              helperText={errors.userName?.message}
              {...register("userName")}
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              error={errors.password}
              helperText={errors.password?.message}
              {...register("password")}
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ marginBottom: "20px" }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress color="secondary" /> : "Login"}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
