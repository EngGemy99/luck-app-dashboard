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
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { schema } from "./schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
function Profile() {
  const [username, setUsername] = React.useState("");
  const [image, setImage] = React.useState("");
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    handleClick();
  };
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
              Ahmed Gamal
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ahmed Gamal@gamil.com
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Admin Details" {...a11yProps(0)} />
          <Tab label="Change Password" {...a11yProps(1)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <Paper
            sx={{
              p: 4,
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                error={errors.userName}
                helperText={errors.userName?.message}
                {...register("userName")}
                label="Username"
                fullWidth
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  mb: 3,
                }}
              />
              <br />
              <TextField
                type="file"
                variant="outlined"
                fullWidth
                onChange={(e) => setImage(e.target.value)}
                sx={{
                  mb: 3,
                }}
              />
              <br />
              <Button variant="contained" color="primary" type="submit">
                Change Details
              </Button>
            </form>
          </Paper>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Paper
            sx={{
              p: 4,
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="new password"
                fullWidth
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  mb: 3,
                }}
              />
              <br />
              <TextField
                label="confirm password"
                variant="outlined"
                fullWidth
                onChange={(e) => setImage(e.target.value)}
                sx={{
                  mb: 3,
                }}
              />
              <br />
              <Button variant="contained" color="primary" type="submit">
                Change Password
              </Button>
            </form>
          </Paper>
        </CustomTabPanel>
      </Grid>
    </Grid>
  );
}

export default Profile;
