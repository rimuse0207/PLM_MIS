import { ResponsiveBar } from "@nivo/bar";
import React from "react";
import styled from "styled-components";

const BarGraphMainDivBox = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const BarGraph = () => {
  const data = [
    {
      label: "A",
      value1: 500,
      value2: 100,
      percent: 15,
    },
    {
      label: "B",
      value1: 3200,
      value2: 1300,
      percent: 74,
    },
    {
      label: "C",
      value1: 3500,
      value2: 1500,
      percent: 75,
    },
    {
      label: "D",
      value1: 3200,
      value2: 1300,
      percent: 74,
    },
    {
      label: "E",
      value1: 3200,
      value2: 1300,
      percent: 74,
    },
  ];

  const StackEndMarkerLayer = ({ bars }) => {
    const value1Bars = bars.filter((bar) => bar.data.id === "value1");

    return (
      <g>
        {value1Bars.map((bar) => {
          const centerX = bar.x + bar.width / 2;
          const y = bar.y;

          // bar 크기 기준 계산
          const totalWidth = bar.width * 1;
          const sideWidth = totalWidth * 0.125;
          const middleWidth = totalWidth * 0.75;

          const sideHeight = 10;
          const middleHeight = 4;

          const startX = centerX - totalWidth / 2;

          return (
            <g key={bar.key}>
              {/* 왼쪽 사각형 */}
              <rect
                x={startX}
                y={y - sideHeight / 2}
                width={sideWidth}
                height={sideHeight}
                rx={2}
                fill="#FFC400"
              />

              {/* 가운데 얇은 바 */}
              <rect
                x={startX + sideWidth}
                y={y - middleHeight / 2}
                width={middleWidth}
                height={middleHeight}
                rx={2}
                fill="#FFC400"
              />

              {/* 오른쪽 사각형 */}
              <rect
                x={startX + sideWidth + middleWidth}
                y={y - sideHeight / 2}
                width={sideWidth}
                height={sideHeight}
                rx={2}
                fill="#FFC400"
              />

              {/* 퍼센트 */}
              <text
                x={centerX}
                y={y + 25}
                textAnchor="middle"
                fontSize={20}
                fontWeight="bold"
                fill="#FFC400"
              >
                {bar.data.data.percent}%
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <BarGraphMainDivBox>
      <div>
        <select>
          <option>Selling Price Top 5</option>
        </select>

        <select>
          <option>Total</option>
        </select>
      </div>

      <ChartWrapper>
        <ResponsiveBar
          defs={[
            {
              id: "value1Gradient",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#1e49aa" }, // 👈 x축 쪽 (진한 파랑)
                { offset: 30, color: "#1e40ff" }, // 👈 위쪽 (연한 파랑)
              ],
            },
          ]}
          fill={[
            {
              match: { id: "value1" },
              id: "value1Gradient",
            },
          ]}
          colors={({ id }) => {
            if (id === "value1") return "#1e40ff"; // fallback
            if (id === "value2") return "#e5efff"; // 연한 파랑 (단색)
            return "#ccc";
          }}
          maxValue={Math.max(...data.map((d) => d.value1 + d.value2)) * 1.1}
          data={data}
          keys={["value1", "value2"]}
          indexBy="label"
          groupMode="stacked"
          margin={{ top: 100, right: 20, bottom: 60, left: 50 }}
          padding={0.5}
          layers={["grid", "axes", "bars", StackEndMarkerLayer]}
          enableLabel={false}
        />
      </ChartWrapper>
    </BarGraphMainDivBox>
  );
};

export default BarGraph;
