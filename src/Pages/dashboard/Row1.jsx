import { Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import { data1, data2, data3, data4 } from "./data";
import Card from "./Card";
import { useSelector } from "react-redux";

const Row1 = () => {
  const theme = useTheme();
  let { allUsers, requests } = useSelector((state) => state.user);
  return (
    <Grid container spacing={2} sx={{ mb: 5 }}>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          icon={
            <EmailIcon
              sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
            />
          }
          title={"12,361"}
          subTitle={"Emails Sent"}
          increase={"+14%"}
          data={data1}
          scheme={"nivo"}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card
          icon={
            <PointOfSaleIcon
              sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
            />
          }
          title={requests.filter((item) => item.status === "pending").length}
          subTitle={"Pending requests"}
          increase={"+40%"}
          data={data2}
          scheme={"category10"}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <Card
          icon={
            <PersonAddIcon
              sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
            />
          }
          title={allUsers.length}
          subTitle={"All Users"}
          increase={"+35%"}
          data={data3}
          scheme={"accent"}
        />
      </Grid>

      <Grid item xs={12}>
        <Card
          icon={
            <TrafficIcon
              sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
            />
          }
          title={"1,325,134"}
          subTitle={"Traffic Received"}
          increase={"+43%"}
          data={data4}
          scheme={"dark2"}
        />
      </Grid>
    </Grid>
  );
};

export default Row1;
