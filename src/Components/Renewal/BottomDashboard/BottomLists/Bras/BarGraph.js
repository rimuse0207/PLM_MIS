import { ResponsiveBar } from "@nivo/bar";
import moment from "moment";
import React from "react";
import styled from "styled-components";

export const BarGraphMainDivBox = styled.div`
  background-color: #fff;
  width: 100%;
  height: 90%;
  /* height: 500px; */
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const BarGraph = ({ data }) => {
  const LegendBarSymbol = ({ x, y, size, fill }) => {
    return (
      <rect
        x={x}
        y={y + size / 4}
        width={size * 2.5} // 👈 길이
        height={size / 2} // 👈 두께
        rx={size / 4} // 👈 둥근 모서리
        fill={fill}
      />
    );
  };

  const chartData = data.map((d) => ({
    ...d,
    Sell_Price_View: d.Sell_Price - d.MC_Price, // 👈 시각화용
  }));
  const StackEndMarkerLayer = ({ bars }) => {
    const value1Bars = bars.filter((bar) => bar.data.id === "MC_Price");

    return (
      <g>
        {value1Bars.map((bar) => {
          const centerX = bar.x + bar.width / 2;
          const y = bar.y;

          // bar 크기 기준 계산
          const totalWidth = bar.width * 1;
          const sideWidth = totalWidth * 0.065;
          const middleWidth = totalWidth * 0.88;

          const sideHeight = 5;
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
                rx={1}
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
                {bar.data.data.MCRate}%
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <BarGraphMainDivBox>
      <ChartWrapper>
        <ResponsiveBar
          defs={[
            {
              id: "value1Gradient",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#0000ff" }, // 👈 x축 쪽 (진한 파랑)
                { offset: 30, color: "#0000ff" }, // 👈 위쪽 (연한 파랑)
              ],
            },
          ]}
          fill={[
            {
              match: { id: "MC_Price" },
              id: "value1Gradient",
            },
          ]}
          colors={({ id }) => {
            if (id === "MC_Price") return "#0000ff"; // fallback
            if (id === "Sell_Price_View") return "#e5efff"; // 연한 파랑 (단색)
            return "#ccc";
          }}
          maxValue={
            Math.max(...chartData.map((d) => d.MC_Price + d.Sell_Price_View)) *
            1.1
          }
          data={chartData}
          keys={["MC_Price", "Sell_Price_View"]}
          indexBy="EQ_NO"
          groupMode="stacked"
          margin={{ top: 20, right: 20, bottom: 100, left: 50 }}
          padding={0.5}
          layers={["grid", "axes", "bars", StackEndMarkerLayer, "legends"]}
          enableLabel={false}
          tooltip={({ id, value, data }) => {
            if (id === "Sell_Price_View") {
              return (
                <div
                  style={{
                    padding: 8,
                    background: "#fff",
                    border: "1px solid #ccc",
                  }}
                >
                  <strong>판가</strong> :{" "}
                  {data.Sell_Price.toLocaleString("ko-KR")}
                </div>
              );
            }

            if (id === "MC_Price") {
              return (
                <div
                  style={{
                    padding: 8,
                    background: "#fff",
                    border: "1px solid #ccc",
                  }}
                >
                  <strong>MC</strong> : {data.MC_Price.toLocaleString("ko-KR")}
                </div>
              );
            }

            return null;
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 10,
            tickRotation: 0,
            renderTick: (tick) => {
              const item = chartData.find((d) => d.EQ_NO === tick.value);

              return (
                <g transform={`translate(${tick.x},${tick.y + 22})`}>
                  {/* Models */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontSize: 12, fontWeight: "bold" }}
                  >
                    {item?.Models} {`#${item?.CHNG_CONT?.split("#")[1]} `}
                  </text>

                  {/* 추가 항목 */}
                  <text
                    y={14}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontSize: 11, fill: "#666" }}
                  >
                    {moment(item?.ProductCreactDate).locale("en").format("MMM")}
                  </text>
                </g>
              );
            },
          }}
          legends={[
            {
              dataFrom: "custom",
              anchor: "bottom",
              direction: "row",
              translateY: 90,
              itemWidth: 160,
              itemHeight: 24,
              itemsSpacing: 0,

              itemDirection: "left-to-right",
              symbolSize: 30,
              symbolSpacing: 60,
              symbolShape: LegendBarSymbol,
              data: [
                { id: "Sell_Price_View", label: "Price", color: "#e5efff" },
                { id: "MC_Price", label: "MC", color: "#0000ff" },
                { id: "MC_Ratio", label: "MC Ratio (%)", color: "#FFC400" },
              ],
            },
          ]}
          theme={{
            legends: {
              text: {
                fontSize: 18,
                fontWeight: 900,
              },
            },
          }}
        />
      </ChartWrapper>
    </BarGraphMainDivBox>
  );
};

export default BarGraph;
