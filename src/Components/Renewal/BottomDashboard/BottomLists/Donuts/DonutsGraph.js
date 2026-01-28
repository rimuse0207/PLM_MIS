import { ResponsivePie } from "@nivo/pie";
import React from "react";

const DonutsGraph = ({ data }) => {
  const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
    const total = dataWithArc.reduce((sum, d) => sum + d.value, 0);

    return (
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#000"
      >
        <tspan
          x={centerX}
          dy="-0.6em"
          fontSize="24"
          fontWeight="600"
          color="black"
        >
          FY25
        </tspan>
        <tspan x={centerX} dy="1.4em" fontSize="24" fontWeight="700">
          Orders : {total.toLocaleString()}
        </tspan>
      </text>
    );
  };
  const COLORS = [
    "#8BC34A", // 연두
    "#2196F3", // 파랑
    "#F44336", // 빨강
    "#FF9800", // 주황
  ];

  return (
    <div style={{ width: "100%", height: "95%" }}>
      <ResponsivePie
        data={data}
        innerRadius={0.7}
        enableArcLabels={true}
        arcLinkLabel={(d) => `${d.id} (${d.formattedValue})`}
        activeInnerRadiusOffset={8}
        layers={[
          "arcs",
          "arcLabels",
          //   "arcLinkLabels",
          "legends",
          CenteredMetric,
        ]}
        margin={{ top: 20, right: 80, bottom: 120, left: 80 }}
        padAngle={0.6}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#fff"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        // arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        arcLabelsTextColor="#FFFFFF"
        theme={{
          labels: {
            text: {
              fontSize: 20,
              fontWeight: 1000,
            },
          },
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            translateY: 56,
            itemWidth: 100,
            itemHeight: 18,
            symbolShape: "circle",
          },
        ]}
        arcLabel={(d) => {
          const total = data.reduce((sum, v) => sum + v.value, 0);
          const percent = ((d.value / total) * 100).toFixed(1);
          return `${percent}%`;
        }}
        colors={COLORS}
      />
    </div>
  );
};

export default DonutsGraph;
