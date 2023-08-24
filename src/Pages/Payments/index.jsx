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
import Swal from "sweetalert2";
import LukeApp from "../../Api/config";
import { useDispatch, useSelector } from "react-redux";
import { editPaymentStatus, addPayment } from "../../store/Slices/userSlice";
import { Link } from "react-router-dom";
import { ToastMessage } from "../../utils/ToastMessage";
function Payments() {
  const dispatch = useDispatch();
  const payment = useSelector((state) => {
    return state.user?.payments;
  });

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
          await LukeApp.patch(`/payment/${requestID}`, {
            status,
          });
          dispatch(editPaymentStatus({ _id: requestID, status }));
          await Swal.fire(
            "Deactivated!",
            "Your Payment has been Deactivated.",
            "success"
          );
        }
      } else {
        await LukeApp.patch(`/payment/${requestID}`, {
          status,
        });
        dispatch(editPaymentStatus({ _id: requestID, status }));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    formData.append("paymentName", data.paymentName);
    if (data.paymentImage.length > 0) {
      formData.append("paymentImage", data.paymentImage[0]);
    }
    setIsLoading(true);
    try {
      const res = await LukeApp.post(`payment`, formData);
      ToastMessage("success", res.data.message);
      dispatch(addPayment(res.data.result));
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
        <Tab label="All Payment way" {...a11yProps(0)} />
        <Tab label="Add Payment way" {...a11yProps(1)} />
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

              {payment.map((item) => {
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
                          <Typography variant="body1">
                            {item.paymentName}
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
                        <Link to={`/edit-payments/${item._id}`}>
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

              {payment.map((item) => {
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
                          <Typography variant="body1">
                            {item.paymentName}
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
                        <Link to={`/edit-payments/${item._id}`}>
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
              label="payment Name"
              error={errors.paymentName}
              helperText={errors.paymentName?.message}
              {...register("paymentName")}
              fullWidth
              variant="outlined"
              sx={{
                mb: 3,
              }}
            />
            <br />
            <TextField
              error={errors.paymentImage}
              helperText={errors.paymentImage?.message}
              {...register("paymentImage")}
              type="file"
              variant="outlined"
              fullWidth
              sx={{
                mb: 3,
              }}
            />
            <br />
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
              {isLoading ? "Loading..." : "Add Payment Way"}
            </Button>
          </form>
        </Paper>
      </CustomTabPanel>
    </>
  );
}

export default Payments;
