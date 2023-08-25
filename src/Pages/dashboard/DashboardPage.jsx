import React from "react";
import Row1 from "./Row1";
import Row2 from "./Row2";
import { Box, Stack } from "@mui/material";
import Header from "../../Components/Header";

const DashboardPage = () => {
  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Header
          isDashboard={true}
          title={"DASHBOARD"}
          subTitle={"Welcome to your dashboard"}
        />
      </Stack>
      <Row1 />
      <Row2 />
    </Box>
  );
};

export default DashboardPage;
