import React from "react";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import Button from "@mui/material/Button";
import { DownloadOutlined } from "@mui/icons-material";
import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import Header from "../../Components/Header";

const DashboardPage = () => {
  const theme = useTheme();
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
      {/* <Row2 /> */}
    </Box>
  );
};

export default DashboardPage;
