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
function TopOffers() {
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
        <Tab label="All Top Offers" {...a11yProps(0)} />
        <Tab label="Add Top Offer" {...a11yProps(1)} />
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
                Active Top Offer
              </Typography>
              <Divider />
              {[..."x".repeat(5)].map((item) => (
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 2,
                    alignItems: "center",
                    mb: "1rem",
                  }}
                >
                  <Box>
                    <CardMedia
                      component="img"
                      height="100"
                      sx={{
                        width: "100px",
                        borderRadius: "50%",
                      }}
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAaeVfXxyG1sNBohvr-x5NOCzM9lvcF_pTzA&usqp=CAU"
                    />
                  </Box>
                  <Box>
                    <CardContent>
                      <Typography variant="body1">test element</Typography>
                      <Typography variant="subtitle1">
                        description element
                      </Typography>
                    </CardContent>
                  </Box>
                  <Box>
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
                Deactivated Top Offer
              </Typography>
              <Divider />
              {[..."x".repeat(10)].map((item) => (
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 2,
                    alignItems: "center",
                    mb: "1rem",
                  }}
                >
                  <Box>
                    <CardMedia
                      component="img"
                      height="100"
                      sx={{
                        width: "100px",
                        borderRadius: "50%",
                      }}
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAaeVfXxyG1sNBohvr-x5NOCzM9lvcF_pTzA&usqp=CAU"
                    />
                  </Box>
                  <Box>
                    <CardContent>
                      <Typography variant="body1">test element</Typography>
                      <Typography variant="subtitle1">
                        description element
                      </Typography>
                    </CardContent>
                  </Box>
                  <Box>
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
              error={errors.point}
              helperText={errors.point?.message}
              {...register("point")}
              label="point"
              variant="outlined"
              fullWidth
              sx={{
                mb: 3,
              }}
            />
            <br />
            <TextField
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
            >
              Add Top Offer
            </Button>
          </form>
        </Paper>
      </CustomTabPanel>
    </>
  );
}

export default TopOffers;
