import { ResponsivePie } from "@nivo/pie";
import React from "react";
import { diviceNumber } from "../../../RenewalMainPage";
import { useSelector } from "react-redux";
import { ColorArray } from "../../BottomDashboardMainPage";

const DonutsGraph = ({ data }) => {
  const Select_Date_State = useSelector(
    (state) => state.Select_Date_Reducer_State.Select_Date_State,
  );
  const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
    const total = dataWithArc.reduce((sum, d) => sum + d.value, 0);

    return (
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#4d4d4d"
      >
        <tspan
          x={centerX}
          dy="-0.6em"
          fontSize="24"
          fontWeight="600"
          color="#4d4d4d"
        >
          FY{Select_Date_State.value.slice(2, 4)}
        </tspan>
        <tspan
          x={centerX}
          dy="1.4em"
          fontSize="24"
          fontWeight="700"
          color="#4d4d4d"
        >
          Orders : {Math.round(total / diviceNumber).toLocaleString("ko-KR")}
        </tspan>
      </text>
    );
  };

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
        colors={(datum) => datum.data.color}
        margin={{ top: 30, right: 50, bottom: 100, left: 50 }}
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
              fontSize: 17,
              fontWeight: 1000,
            },
          },
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            translateY: 56,
            itemWidth: 80,
            itemHeight: 18,
            symbolShape: "circle",
            symbolSpacing: 4,
          },
        ]}
        arcLabel={(d) => {
          const total = data.reduce((sum, v) => sum + v.value, 0);
          const percent = ((d.value / total) * 100).toFixed(1);
          if (percent < 5) return "";
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

export default DonutsGraph;
