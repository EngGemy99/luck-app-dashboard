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
import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { schema, schemaChangePassword } from "./schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LukeApp from "../../Api/config";
import { useEffect } from "react";
import { ToastMessage } from "../../utils/ToastMessage";
function Profile() {
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
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
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    reset: reset2,
  } = useForm({
    resolver: yupResolver(schemaChangePassword),
  });

  useEffect(() => {
    reset({
      userName: user.userName,
    });
  }, [reset, user.userName]);
  const onSubmit = async (data) => {
    setIsLoading(true);
    const { userName } = data;
    const formData = new FormData();
    if (user.userName != userName) {
      formData.append("userName", userName);
    }
    if (imageFile) {
      formData.append("image", imageFile);
    }
    try {
      const res = await LukeApp.patch(`admin/profile`, formData);
      ToastMessage("success", res.data.message);
    } catch (error) {
      console.log(error);
      // ToastMessage("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit2 = async (data) => {
    setIsLoading(true);
    try {
      const res = await LukeApp.patch(`/admin/change-password`, data);
      ToastMessage("success", res.data.message);
    } catch (error) {
      console.log(error);
      // ToastMessage("success", error);
    } finally {
      reset2();
      setIsLoading(false);
    }
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

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [imageSrc, setImageSrc] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            py: "2rem",
          }}
        >
          <label htmlFor="profilePhoto" style={{ cursor: "pointer" }}>
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <Box
              sx={{
                position: "relative",
              }}
            >
              <CardMedia
                component="img"
                height="150"
                image={imageSrc ? imageSrc : user?.profilePic?.secure_url}
                alt="Profile picture"
                sx={{
                  width: " 150px",
                  margin: "auto",
                  borderRadius: "50%",
                }}
              />
              <AddPhotoAlternateIcon
                style={{
                  position: "absolute",
                  right: "29%",
                  top: "70%",
                }}
              />
            </Box>
          </label>
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
                label="userName"
                fullWidth
                variant="filled"
                sx={{
                  mb: 3,
                }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Change Details"}
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
            <form onSubmit={handleSubmit2(onSubmit2)}>
              <TextField
                type="password"
                error={errors2.password}
                helperText={errors2.password?.message}
                {...register2("password")}
                label="new password"
                fullWidth
                variant="outlined"
                sx={{
                  mb: 3,
                }}
              />
              <br />
              <TextField
                type="password"
                error={errors2.confirmPassword}
                helperText={errors2.confirmPassword?.message}
                {...register2("confirmPassword")}
                label="confirm password"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 3,
                }}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Change Password"}
              </Button>
            </form>
          </Paper>
        </CustomTabPanel>
      </Grid>
    </Grid>
  );
}

export default Profile;
