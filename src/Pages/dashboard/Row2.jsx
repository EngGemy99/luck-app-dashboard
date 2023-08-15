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
import { Transactions } from "./data";
import LineChartComponent from "../../Components/LineChartComponent";

const Row2 = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ Width: "100%" }}>
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

          <LineChartComponent isDahboard={true} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Box
          sx={{
            overflow: "auto",
            borderRadius: "4px",
            minWidth: "280px",
            maxHeight: 355,
            flexGrow: 1,
          }}
          id="scrollDiv"
        >
          <Paper>
            <Typography
              color={theme.palette.secondary.main}
              fontWeight={"bold"}
              p={1.2}
              variant="h6"
            >
              Recent Transactions
            </Typography>
          </Paper>
          {Transactions.map((item, index) => {
            return (
              <Paper
                key={index}
                sx={{
                  mt: 0.4,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box p={1.2}>
                  <Typography variant="body1">{item.txId}</Typography>
                  <Typography variant="body2">{item.user} </Typography>
                </Box>
                <Typography variant="body1">{item.date} </Typography>

                <Typography
                  borderRadius={1.4}
                  p={1}
                  bgcolor={theme.palette.error.main}
                  color={theme.palette.getContrastText(
                    theme.palette.error.main
                  )}
                  variant="body2"
                >
                  ${item.cost}
                </Typography>
              </Paper>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Row2;
