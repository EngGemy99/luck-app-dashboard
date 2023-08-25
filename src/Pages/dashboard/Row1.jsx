import { Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import { data1, data2, data3, data4, data5, data6 } from "./data";
import Card from "./Card";
import { useSelector } from "react-redux";
import LukeApp from "../../Api/config";

const Row1 = () => {
  const [profit, setProfit] = useState("");
  const getProfit = async () => {
    const { data } = await LukeApp.get(`admin/payouts`);
    setProfit(data.result);
  };
  useEffect(() => {
    getProfit();
  }, []);

  const theme = useTheme();
  let { allUsers, requests } = useSelector((state) => state.user);
  return (
    <Grid container spacing={2} sx={{ mb: 5 }}>
      <Grid item xs={12} sm={6}>
        <Card
          icon={
            <PersonAddIcon
              sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
            />
          }
          title={allUsers.length}
          subTitle={"All Users"}
          increase={"+35%"}
          data={data1}
          scheme={"accent"}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
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

      <Grid item xs={12} sm={6} md={3}>
        <Card
          icon={
            <TrafficIcon
              sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
            />
          }
          title={`${profit.day}$`}
          subTitle={"Today Profit"}
          increase={"+10%"}
          data={data3}
          scheme={"dark2"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          icon={
            <TrafficIcon
              sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
            />
          }
          title={`${profit.week}$`}
          subTitle={"This Week"}
          increase={"+15%"}
          data={data4}
          scheme={"dark2"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          icon={
            <TrafficIcon
              sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
            />
          }
          title={`${profit.month}$`}
          subTitle={"This Month"}
          increase={"+35%"}
          data={data5}
          scheme={"dark2"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          icon={
            <TrafficIcon
              sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
            />
          }
          title={`${profit.allTime}$`}
          subTitle={"All Time"}
          increase={"+43%"}
          data={data6}
          scheme={"dark2"}
        />
      </Grid>
    </Grid>
  );
};

export default Row1;
