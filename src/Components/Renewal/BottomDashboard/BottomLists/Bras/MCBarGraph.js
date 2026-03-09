import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { BarGraphMainDivBox, ChartWrapper } from "./BarGraph";

const MCBarGraph = ({ data, setSelectBarSegment, setSelectBarTitle }) => {
  return (
    <BarGraphMainDivBox>
      <ChartWrapper>
        <ResponsiveBar
          onClick={(e) => {
            setSelectBarSegment(e.indexValue);
            setSelectBarTitle(e.indexValue);
          }}
          defs={[
            {
              id: "yellowGradient",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#ffe89f" }, // 👇 아래 (진한 노랑)
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
          margin={{ top: 50, right: 0, left: 40, bottom: 40 }}
          padding={0.5}
          groupMode="stacked"
          colors={({ id }) => {
            if (id === "MCRate") return "#FFD54F";
            return "#ccc";
          }}
          colorBy="id"
          isInteractive={true}
          enableLabel={false}
          theme={{
            // labels: { text: { fontSize: "0.8rem", fill: "#000000" } },
            legends: { text: { fontSize: "0.8rem", fill: "#000000" } },
            axis: {
              domain: {
                line: {
                  stroke: "#777",
                  strokeWidth: 1,
                },
              },
              legend: { text: { fontSize: "0.8rem", fill: "#000000" } },
              ticks: {
                text: { fontSize: "0.8rem", fill: "#000000" },
                line: {
                  stroke: "#777",
                  strokeWidth: 1,
                },
              },
            },
          }}
          axisBottom={{
            tickSize: 0,
          }}
          axisLeft={{
            tickSize: -5,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: [25, 50, 75, 100],
            format: () => "", // 👈 숫자를 빈 문자열로 반환하여 숨김
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
