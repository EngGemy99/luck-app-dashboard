import {
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
function Payments() {
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
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
                Active Payment
              </Typography>
              <Divider />
              {[..."x".repeat(5)].map((item) => (
                <Card
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
                    <CardMedia
                      component="img"
                      height="80"
                      sx={{
                        width: "80px",
                        borderRadius: "50%",
                      }}
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAaeVfXxyG1sNBohvr-x5NOCzM9lvcF_pTzA&usqp=CAU"
                    />
                    <CardContent
                      sx={{
                        flexShrink: 1,
                      }}
                    >
                      <Typography variant="body1">test element</Typography>
                      <Typography variant="subtitle1">
                        description element
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
                      }}
                    >
                      Deactivate
                    </Button>
                    <Button variant="contained" color="primary">
                      Edit
                    </Button>
                  </Box>
                </Card>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
              }}
            >
              <Typography variant="h5" color="inherit">
                Deactivated Payment
              </Typography>
              <Divider />
              {[..."x".repeat(10)].map((item) => (
                <Card
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
                    <CardMedia
                      component="img"
                      height="80"
                      sx={{
                        width: "80px",
                        borderRadius: "50%",
                      }}
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAaeVfXxyG1sNBohvr-x5NOCzM9lvcF_pTzA&usqp=CAU"
                    />
                    <CardContent
                      sx={{
                        flexShrink: 1,
                      }}
                    >
                      <Typography variant="body1">test element</Typography>
                      <Typography variant="subtitle1">
                        description element
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
                    >
                      active
                    </Button>
                    <Button variant="contained" color="primary">
                      Edit
                    </Button>
                  </Box>
                </Card>
              ))}
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
              type="file"
              error={errors.image}
              helperText={errors.image?.message}
              {...register("image")}
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
            >
              Add Payment Way
            </Button>
          </form>
        </Paper>
      </CustomTabPanel>
    </>
  );
}

export default Payments;
