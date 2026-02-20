import { ResponsiveBar } from "@nivo/bar";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export const BarGraphMainDivBox = styled.div`
  background-color: #fff;
  width: 100%;
  height: 88%;
  display: flex; /* Y축 고정 배치 */
  position: relative;
`;

const FixedYAxis = styled.div`
  width: 70px;
  height: 100%;
  flex-shrink: 0;
  background-color: #fff;
  z-index: 2;
`;

export const ChartWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  z-index: 1;

  /* --- 스크롤바 커스텀 스타일 --- */
  &::-webkit-scrollbar {
    height: 10px; /* 스크롤바 두께 */
  }
  &::-webkit-scrollbar-track {
    background: lightgray; /* 스크롤바 배경색 */
    border-radius: 10px; /* 배경 양끝 둥글게 */
    border: none;
  }
  &::-webkit-scrollbar-thumb {
    background: #ddddff; /* 스크롤바 막대 색상 */
    border-radius: 10px; /* 막대 양끝 둥글게 */
    border: 1px solid #fff;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #ccccff; /* 마우스 오버 시 색상 */
  }
`;

export const InnerChartContainer = styled.div`
  height: 100%;
  width: ${(props) => props.width};
`;

const BarGraph = ({ data }) => {
  const Select_Date_State = useSelector(
    (state) => state.Select_Date_Reducer_State.Select_Date_State,
  );

  const MAX_VISIBLE_ITEMS = 7;
  const ITEM_WIDTH = 120;
  const dynamicWidth =
    data.length > MAX_VISIBLE_ITEMS ? `${data.length * ITEM_WIDTH}px` : "100%";

  const chartData = data.map((d) => ({
    ...d,
    Sell_Price_View: d.Sell_Price - d.MC_Price,
  }));

  // 높이 기준점 계산
  const globalMaxValue =
    Math.max(...chartData.map((d) => d.MC_Price + d.Sell_Price_View)) * 1.1;

  // 공통 마진
  const commonMargin = { top: 30, right: 70, bottom: 120, left: 0 };

  const StackEndMarkerLayer = ({ bars }) => {
    const value1Bars = bars.filter((bar) => bar.data.id === "MC_Price");
    return (
      <g>
        {value1Bars.map((bar) => {
          const { Sell_Price } = bar.data.data;
          const centerX = bar.x + bar.width / 2;
          const y = bar.y;
          const showAbove = Sell_Price <= globalMaxValue * 0.8;
          const textY = showAbove ? y - 30 : y + 25;

          return (
            <g key={bar.key}>
              <rect
                x={centerX - bar.width / 2}
                y={y - 6.5}
                width={3}
                height={13}
                fill="#FFC400"
              />
              <rect
                x={centerX - bar.width / 2}
                y={y - 1.5}
                width={bar.width}
                height={3}
                fill="#FFC400"
              />
              <rect
                x={centerX + bar.width / 2 - 3}
                y={y - 6.5}
                width={3}
                height={13}
                fill="#FFC400"
              />
              <text
                x={centerX}
                y={textY}
                textAnchor="middle"
                fontSize={18}
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
      {/* --- 1. 고정된 Y축 (가로선 제거 및 틱 개수 조절) --- */}
      <FixedYAxis>
        <ResponsiveBar
          data={chartData}
          keys={["MC_Price", "Sell_Price_View"]}
          indexBy="EQ_NO"
          maxValue={globalMaxValue}
          margin={{ ...commonMargin, left: 60 }}
          padding={0.5}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickValues: 5, // Y축 눈금 개수를 최대 5개로 설정
            format: (v) => v.toLocaleString(),
          }}
          axisBottom={null}
          enableGridX={false}
          enableGridY={false} // ★ Y축 배경 선 제거
          layers={["axes"]} // ★ grid 레이어를 제거하여 선을 없앰
          theme={{
            axis: { ticks: { text: { fontSize: 13, fontWeight: 600 } } },
          }}
        />
      </FixedYAxis>

      {/* --- 2. 실제 데이터 스크롤 차트 (가로선 제거) --- */}
      <ChartWrapper>
        <InnerChartContainer width={dynamicWidth}>
          <ResponsiveBar
            data={chartData}
            keys={["MC_Price", "Sell_Price_View"]}
            indexBy="EQ_NO"
            maxValue={globalMaxValue}
            margin={commonMargin}
            padding={0.5}
            colors={({ id }) => (id === "MC_Price" ? "#0000ff" : "#ddddff")}
            enableLabel={false}
            enableGridY={false} // ★ 데이터 영역 가로 선 제거
            axisLeft={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 10,
              renderTick: (tick) => {
                const item = chartData.find((d) => d.EQ_NO === tick.value);
                return (
                  <g transform={`translate(${tick.x},${tick.y + 22})`}>
                    <text
                      textAnchor="middle"
                      style={{ fontSize: 12, fontWeight: "bold" }}
                    >
                      {item?.Models}
                    </text>
                    <text
                      y={14}
                      textAnchor="middle"
                      style={{ fontSize: 11 }}
                    >{`#${item?.CHNG_CONT?.split("#")[1]}`}</text>
                    <text y={28} textAnchor="middle" style={{ fontSize: 11 }}>
                      {moment(item?.ProductCreactDate).format("YYYY") ===
                      Select_Date_State.value
                        ? moment(item?.ProductCreactDate)
                            .locale("en")
                            .format("MMM")
                        : moment(item?.ProductCreactDate)
                            .locale("en")
                            .format("YY MMM")}
                    </text>
                  </g>
                );
              },
            }}
            // grid를 제외하고 바와 축(X축용)만 표시
            layers={["bars", StackEndMarkerLayer, "axes"]}
            tooltip={({ id, data }) => (
              <div
                style={{
                  padding: 8,
                  background: "#fff",
                  border: "1px solid #ccc",
                }}
              >
                <strong>{id === "Sell_Price_View" ? "판가" : "MC"}</strong> :{" "}
                {(id === "Sell_Price_View"
                  ? data.Sell_Price
                  : data.MC_Price
                ).toLocaleString()}
              </div>
            )}
          />
        </InnerChartContainer>
      </ChartWrapper>
    </BarGraphMainDivBox>
  );
};

export default BarGraph;
