import { Box, Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import PieChartComponent from "../../Components/PieChartComponent";
import BarChartComponent from "../../Components/BarChartComponent";
import GeographyChartComponent from "../../Components/GeographyChartComponent/GeographyChartComponent";

const Row3 = () => {
  const theme = useTheme();
  return (
    <Grid container spacing={2} sx={{ mt: 5 }}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ width: "100%", height: "100%" }}>
          <Typography
            color={theme.palette.secondary.main}
            sx={{ padding: "30px 30px 0 30px" }}
            variant="h6"
            fontWeight="600"
          >
            Campaign
          </Typography>

          <PieChartComponent isDashbord={true} />
          <Typography variant="h6" align="center" sx={{ mt: "15px" }}>
            $48,352 revenue generated
          </Typography>
          <Typography variant="body2" px={0.7} pb={3} align="center">
            Includes extra misc expenditures and costs
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ width: "100%", height: "100%" }}>
          <Typography
            color={theme.palette.secondary.main}
            variant="h6"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>

          <BarChartComponent isDashbord={true} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ width: "100%", height: "100%" }}>
          <GeographyChartComponent isDashbord={true} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Row3;
