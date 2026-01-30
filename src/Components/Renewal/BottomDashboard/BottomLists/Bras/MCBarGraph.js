import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { BarGraphMainDivBox, ChartWrapper } from "./BarGraph";

const MCBarGraph = ({ data }) => {
  return (
    <BarGraphMainDivBox>
      <ChartWrapper>
        <ResponsiveBar
          defs={[
            {
              id: "yellowGradient",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#FFF8E1" }, // 👇 아래 (진한 노랑)
                { offset: 100, color: "#FFD54F" }, // 👆 위 (연한 노랑)
              ],
            },
          ]}
          fill={[
            {
              match: { id: "MCRate" },
              id: "yellowGradient",
            },
          ]}
          data={data}
          maxValue={100}
          keys={["MCRate"]}
          indexBy="code"
          margin={{ top: 50, right: 0, left: 100, bottom: 40 }}
          padding={0.5}
          groupMode="stacked"
          colors={({ id }) => {
            if (id === "MCRate") return "#FFD54F";
            return "#ccc";
          }}
          colorBy="id"
          isInteractive={false}
          enableLabel={false}
          theme={{
            labels: { text: { fontSize: "0.8rem", fill: "#000000" } },
            legends: { text: { fontSize: "0.8rem", fill: "#000000" } },
            axis: {
              legend: { text: { fontSize: "0.8rem", fill: "#000000" } },
              ticks: { text: { fontSize: "0.8rem", fill: "#000000" } },
            },
          }}
          axisBottom={{
            tickSize: 0,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 20,
            tickRotation: 0,
            legendPosition: "middle",
            legendOffset: -40,

            tickValues: [0, 25, 50, 75, 100], // 👈 핵심
            format: (value) => `${value}%`, // 퍼센트면 이게 더 예쁨
          }}
          enableGridY={false}
          layers={[
            "grid",
            "axes",
            "bars",
            "markers",
            "legends",
            ({ bars }) => (
              <g>
                {bars.map((bar) => {
                  const percent = bar.data.value;

                  return (
                    <text
                      key={`${bar.key}-percent`}
                      x={bar.x + bar.width / 2}
                      y={bar.y - 6} // 👈 bar 바로 위
                      textAnchor="middle"
                      dominantBaseline="baseline"
                      style={{
                        fill: "#000",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        pointerEvents: "none",
                      }}
                    >
                      {percent}%
                    </text>
                  );
                })}
              </g>
            ),
          ]}
        />
      </ChartWrapper>
    </BarGraphMainDivBox>
  );
};

export default MCBarGraph;
