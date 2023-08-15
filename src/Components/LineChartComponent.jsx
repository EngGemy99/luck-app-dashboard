import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Box, useTheme } from "@mui/material";
const data = [
  {
    id: "japan",
    color: "hsl(333, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 123,
      },
      {
        x: "helicopter",
        y: 30,
      },
      {
        x: "boat",
        y: 99,
      },
      {
        x: "train",
        y: 118,
      },
      {
        x: "subway",
        y: 21,
      },
      {
        x: "bus",
        y: 38,
      },
      {
        x: "car",
        y: 74,
      },
      {
        x: "moto",
        y: 91,
      },
      {
        x: "bicycle",
        y: 299,
      },
      {
        x: "horse",
        y: 90,
      },
      {
        x: "skateboard",
        y: 247,
      },
      {
        x: "others",
        y: 84,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(310, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 155,
      },
      {
        x: "helicopter",
        y: 174,
      },
      {
        x: "boat",
        y: 193,
      },
      {
        x: "train",
        y: 248,
      },
      {
        x: "subway",
        y: 86,
      },
      {
        x: "bus",
        y: 100,
      },
      {
        x: "car",
        y: 144,
      },
      {
        x: "moto",
        y: 253,
      },
      {
        x: "bicycle",
        y: 106,
      },
      {
        x: "horse",
        y: 26,
      },
      {
        x: "skateboard",
        y: 268,
      },
      {
        x: "others",
        y: 155,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(172, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 237,
      },
      {
        x: "helicopter",
        y: 295,
      },
      {
        x: "boat",
        y: 35,
      },
      {
        x: "train",
        y: 113,
      },
      {
        x: "subway",
        y: 103,
      },
      {
        x: "bus",
        y: 134,
      },
      {
        x: "car",
        y: 84,
      },
      {
        x: "moto",
        y: 94,
      },
      {
        x: "bicycle",
        y: 164,
      },
      {
        x: "horse",
        y: 52,
      },
      {
        x: "skateboard",
        y: 69,
      },
      {
        x: "others",
        y: 229,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(211, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 284,
      },
      {
        x: "helicopter",
        y: 233,
      },
      {
        x: "boat",
        y: 50,
      },
      {
        x: "train",
        y: 149,
      },
      {
        x: "subway",
        y: 148,
      },
      {
        x: "bus",
        y: 208,
      },
      {
        x: "car",
        y: 297,
      },
      {
        x: "moto",
        y: 237,
      },
      {
        x: "bicycle",
        y: 83,
      },
      {
        x: "horse",
        y: 252,
      },
      {
        x: "skateboard",
        y: 90,
      },
      {
        x: "others",
        y: 275,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(100, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 137,
      },
      {
        x: "helicopter",
        y: 142,
      },
      {
        x: "boat",
        y: 146,
      },
      {
        x: "train",
        y: 131,
      },
      {
        x: "subway",
        y: 244,
      },
      {
        x: "bus",
        y: 89,
      },
      {
        x: "car",
        y: 205,
      },
      {
        x: "moto",
        y: 21,
      },
      {
        x: "bicycle",
        y: 239,
      },
      {
        x: "horse",
        y: 162,
      },
      {
        x: "skateboard",
        y: 126,
      },
      {
        x: "others",
        y: 189,
      },
    ],
  },
];
function LineChartComponent({ isDashbord = false }) {
  const theme = useTheme();

  return (
    <Box sx={{ height: isDashbord ? "300px" : "75vh" }}>
      <ResponsiveLine
        theme={{
          textColor: theme.palette.text.primary,
          fontSize: 11,
          axis: {
            domain: {
              line: {
                stroke: theme.palette.divider,
                strokeWidth: 1,
              },
            },
            legend: {
              text: {
                fontSize: 12,
                fill: theme.palette.text.primary,
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.divider,
                strokeWidth: 1,
              },
              text: {
                fontSize: 11,
                fill: theme.palette.text.secondary,
              },
            },
          },
          grid: {
            line: {
              stroke: theme.palette.divider,
              strokeWidth: 1,
            },
          },
          legends: {
            title: {
              text: {
                fontSize: 11,
                fill: theme.palette.text.primary,
              },
            },
            text: {
              fontSize: 11,
              fill: theme.palette.text.primary,
            },
            ticks: {
              line: {},
              text: {
                fontSize: 10,
                fill: theme.palette.text.primary,
              },
            },
          },
          annotations: {
            text: {
              fontSize: 13,
              fill: theme.palette.text.primary,
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
            link: {
              stroke: "#000000",
              strokeWidth: 1,
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
            outline: {
              stroke: "#000000",
              strokeWidth: 2,
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
            symbol: {
              fill: "#000000",
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
          },
          tooltip: {
            container: {
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
              fontSize: 12,
            },
            basic: {},
            chip: {},
            table: {},
            tableCell: {},
            tableCellValue: {},
          },
        }}
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
}

export default LineChartComponent;
