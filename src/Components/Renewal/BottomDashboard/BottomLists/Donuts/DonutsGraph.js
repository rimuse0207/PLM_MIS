import { ResponsivePie } from "@nivo/pie";
import React from "react";
import { diviceNumber } from "../../../RenewalMainPage";
import { useSelector } from "react-redux";
import { ColorArray } from "../../BottomDashboardMainPage";

const legendContainerStyle = {
  display: "flex",
  flexWrap: "wrap", // 줄바꿈 허용
  justifyContent: "center", // 중앙 정렬
  gap: "15px", // 아이템 사이 간격 (여기서 조절!)
  marginTop: "20px",
  position: "absolute",
  bottom: "45px",
  left: "30px",
};

const legendItemStyle = {
  display: "flex",
  alignItems: "center",
  fontSize: "12px",
  fontWeight: "400",
  color: "#4d4d4d",
};

const colorBoxStyle = (color) => ({
  width: "12px",
  height: "12px",
  backgroundColor: color,
  borderRadius: "50%", // 원형 심볼
  marginRight: "6px",
});

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
          {Select_Date_State.value.slice(0, 4)}
        </tspan>
        <tspan
          x={centerX}
          dy="1.4em"
          fontSize="24"
          fontWeight="700"
          color="#4d4d4d"
        >
          수주액 : {Math.round(total / diviceNumber).toLocaleString("ko-KR")}
          억원
        </tspan>
      </text>
    );
  };
  const CustomArcLabels = ({ dataWithArc, centerX, centerY }) => {
    const sortedData = [...dataWithArc].sort((a, b) => b.value - a.value);
    const firstId = sortedData[0]?.data.id;

    const total = dataWithArc.reduce((sum, v) => sum + v.value, 0);

    return dataWithArc.map((arc) => {
      const isFirst = arc.data.id === firstId;

      const percent = (arc.value / total) * 100;
      if (percent < 5) return null;

      const midAngle =
        (arc.arc.startAngle + arc.arc.endAngle) / 2 - Math.PI / 2;

      const radius =
        arc.arc.innerRadius + (arc.arc.outerRadius - arc.arc.innerRadius) / 2;

      const x = centerX + Math.cos(midAngle) * radius;
      const y = centerY + Math.sin(midAngle) * radius;

      return (
        <text
          key={arc.data.id}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fill: "#FFFFFF",
            fontSize: isFirst ? "20px" : "12px",
            fontWeight: isFirst ? "900" : "500",
            pointerEvents: "none",
          }}
        >
          {percent.toFixed(1)}%
        </text>
      );
    });
  };

  return (
    <div style={{ width: "100%", height: "95%", position: "relative" }}>
      <ResponsivePie
        data={data}
        innerRadius={0.7}
        enableArcLabels={false}
        arcLinkLabel={(d) => `${d.id} (${d.formattedValue})`}
        activeInnerRadiusOffset={8}
        layers={[
          "arcs",
          "arcLabels",
          //   "arcLinkLabels",
          "legends",
          CenteredMetric,
          CustomArcLabels,
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
        // legends={[
        //   {
        //     anchor: "bottom",
        //     direction: "row",
        //     translateY: 56,
        //     itemWidth: 80,
        //     itemHeight: 18,
        //     symbolShape: "circle",
        //     symbolSpacing: 4,
        //   },
        // ]}
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
      <div style={legendContainerStyle}>
        {data.map((item) => (
          <div key={item.id} style={legendItemStyle}>
            <div style={colorBoxStyle(item.color)} />
            <span>{item.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutsGraph;
