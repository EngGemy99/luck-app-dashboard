import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { DownloadOutlined } from "@mui/icons-material";
import LineChartComponent from "../../Components/LineChartComponent";

const Row2 = () => {
  const theme = useTheme();

  return (
    <Paper style={{ width: "100% !important" }}>
      <Stack
        alignItems={"center"}
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
      >
        <Box>
          <Typography
            color={theme.palette.secondary.main}
            mb={1}
            mt={2}
            ml={4}
            variant="h6"
            fontWeight={"bold"}
          >
            Revenue Generated
          </Typography>
          <Typography variant="body2" ml={4}>
            $59,342.32
          </Typography>
        </Box>

        <Box>
          <IconButton sx={{ mr: 3 }}>
            <DownloadOutlined />
          </IconButton>
        </Box>
      </Stack>
      <LineChartComponent />
    </Paper>
  );
};

export default Row2;
