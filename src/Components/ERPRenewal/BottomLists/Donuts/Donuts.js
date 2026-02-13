import { ResponsivePie } from "@nivo/pie";
import React from "react";

const Donuts = ({ data }) => {
  const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
    return (
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#000"
      ></text>
    );
  };
  return (
    <div style={{ height: "300px" }}>
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
        colors={(datum) => datum.data.color}
        margin={{ top: 0, right: 50, bottom: 0, left: 50 }}
        padAngle={2}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#fff"
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsRadiusOffset={2}
        arcLabelsTextColor="black"
        theme={{
          labels: {
            text: {
              fontSize: 15,
              fontWeight: 1000,
            },
          },
        }}
        arcLabel={(d) => {
          const total = data.reduce((sum, v) => sum + v.value, 0);
          const percent = ((d.value / total) * 100).toFixed(1);
          if (percent < 20) return "";
          return `${percent}%`;
        }}
        tooltip={({ datum }) => (
          <div
            style={{
              padding: "6px 10px",
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            <span style={{ color: datum.color }}>{datum.id}</span>
            <br />
            {datum.value.toLocaleString("ko-KR")}
          </div>
        )}
      />
    </div>
  );
};

export default Donuts;
