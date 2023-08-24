import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import LukeApp from "../../Api/config";

import { ToastMessage } from "../../utils/ToastMessage";

import { Link } from "react-router-dom";

function Video() {
  const dispatch = useDispatch();
  const offers = useSelector((state) => {
    return state.user?.offers;
  });
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

  const changeStatus = async (requestID, status) => {
    try {
      if (status === "deactivate") {
        const result = await Swal.fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        });
        if (result.isConfirmed) {
          await LukeApp.patch(`/offers/wall/${requestID}`, {
            status,
          });
          dispatch(editOfferStatus({ _id: requestID, status }));
          await Swal.fire(
            "Deactivated!",
            "Your offer wall has been Deactivated.",
            "success"
          );
        }
      } else {
        await LukeApp.patch(`/offers/wall/${requestID}`, {
          status,
        });
        dispatch(editOfferStatus({ _id: requestID, status }));
      }
    } catch (error) {
      console.log(error);
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

  const [value, setValue] = React.useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("url", data.url);
    formData.append("offerType", "offersWall");
    if (data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    setIsLoading(true);
    try {
      const res = await LukeApp.post(`offers/wall`, formData);
      ToastMessage("success", res.data.message);
      dispatch(addOffersWall(res.data.newOfferWall));
    } catch (error) {
      ToastMessage("error", error.response.data.error);
    } finally {
      reset();
      setIsLoading(false);
    }
  };
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="All Offers Wall" {...a11yProps(0)} />
        <Tab label="Add Offer Wall" {...a11yProps(1)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
              }}
            >
              <Typography variant="h5" color="inherit">
                Active OfferWalls
              </Typography>
              <Divider />
              {offers.map((item) => {
                if (item.status == "active") {
                  return (
                    <Card
                      key={item._id}
                      sx={{
                        p: 2,
                        mb: "1rem",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <Avatar
                          sx={{
                            height: "80px",
                            width: "80px",
                            borderRadius: "50%",
                          }}
                          src={item.image?.secure_url}
                        />
                        <CardContent
                          sx={{
                            flexShrink: 1,
                          }}
                        >
                          <Typography variant="body1">{item.title}</Typography>
                          <Typography variant="subtitle1">
                            {item.description}
                          </Typography>
                        </CardContent>
                      </Box>
                      <Box
                        sx={{
                          textAlign: "right",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="error"
                          sx={{
                            mr: ".5rem",
                            color: "inherit",
                            padding: "5px 11px",
                          }}
                          onClick={() => changeStatus(item._id, "deactivate")}
                        >
                          Deactivate
                        </Button>
                        <Link to={`/edit-offers/${item._id}`}>
                          <Button variant="contained" color="primary">
                            Edit
                          </Button>
                        </Link>
                      </Box>
                    </Card>
                  );
                }
              })}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
              }}
            >
              <Typography variant="h5" color="inherit">
                Deactivated OfferWalls
              </Typography>
              <Divider />
              {offers.map((item) => {
                if (item.status == "deactivate") {
                  return (
                    <Card
                      key={item._id}
                      sx={{
                        p: 2,
                        mb: "1rem",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          sx={{
                            height: "80px",
                            width: "80px",
                            borderRadius: "50%",
                          }}
                          src={item.image?.secure_url}
                        />
                        <CardContent
                          sx={{
                            flexShrink: 1,
                          }}
                        >
                          <Typography variant="body1">{item.title}</Typography>
                          <Typography variant="subtitle1">
                            {item.description}
                          </Typography>
                        </CardContent>
                      </Box>
                      <Box
                        sx={{
                          textAlign: "right",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="success"
                          sx={{
                            mr: ".5rem",
                            color: "inherit",
                          }}
                          onClick={() => changeStatus(item._id, "active")}
                        >
                          active
                        </Button>
                        <Link to={`/edit-offers/${item._id}`}>
                          <Button variant="contained" color="primary">
                            Edit
                          </Button>
                        </Link>
                      </Box>
                    </Card>
                  );
                }
              })}
            </Paper>
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Paper
          sx={{
            p: 4,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="title"
              error={errors.title}
              helperText={errors.title?.message}
              {...register("title")}
              fullWidth
              variant="outlined"
              sx={{
                mb: 3,
              }}
            />
            <br />
            <TextField
              label="description"
              error={errors.description}
              helperText={errors.description?.message}
              {...register("description")}
              variant="outlined"
              fullWidth
              sx={{
                mb: 3,
              }}
            />
            <br />
            <TextField
              error={errors.url}
              helperText={errors.url?.message}
              {...register("url")}
              label="url"
              variant="outlined"
              fullWidth
              sx={{
                mb: 3,
              }}
            />
            <br />
            <TextField
              error={errors.image}
              helperText={errors.image?.message}
              {...register("image")}
              type="file"
              variant="outlined"
              fullWidth
              sx={{
                mb: 3,
              }}
            />
            <br />
            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{
                color: "inherit",
              }}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : " Add Offer Wall"}
            </Button>
          </form>
        </Paper>
      </CustomTabPanel>
    </>
  );
}

export default Video;
