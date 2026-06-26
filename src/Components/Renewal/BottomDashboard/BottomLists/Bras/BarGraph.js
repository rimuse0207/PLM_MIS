import { ResponsiveBar } from "@nivo/bar";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { diviceNumber } from "../../../RenewalMainPage";

export const BarGraphMainDivBox = styled.div`
  background-color: #fff;
  width: 100%;
  height: 95%;
  display: flex; /* Y축 고정 배치 */
  position: relative;
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

const ColoPicks = [
  {
    id: "CLT",
    label: "CLT",
    code: "CLT",
    value: 0,
    SumValue: 0,
    color: "#1146af",
  },
  {
    id: "MBT",
    label: "MBT",
    code: "MBT",
    value: 0,
    SumValue: 0,
    color: "#b9e3a6",
  },
  {
    id: "Storage",
    label: "Storage",
    code: "Storage",
    value: 0,
    SumValue: 0,
    color: "#8acaf4",
  },
  {
    id: "DC/Module",
    label: "DC/Module",
    code: "Module",
    value: 0,
    SumValue: 0,
    color: "#f6e7bc ",
  },
  {
    id: "SoC",
    label: "SoC",
    code: "SOC",
    value: 0,
    SumValue: 0,
    color: "#6600cc",
  },
];

export const InnerChartContainer = styled.div`
  height: 100%;
  width: ${(props) => props.width};
`;

const BarGraph = ({ data, types }) => {
  const Select_Date_State = useSelector(
    (state) => state.Select_Date_Reducer_State.Select_Date_State,
  );

  const MAX_VISIBLE_ITEMS = 7;
  const ITEM_WIDTH = 130;
  const dynamicWidth =
    data.length > MAX_VISIBLE_ITEMS ? `${data.length * ITEM_WIDTH}px` : "100%";

  const chartData = data.map((d) => ({
    ...d,
    Sell_Price_View: d.Sell_Price - d.MC_Price,
  }));

  // 공통 마진
  const commonMargin = { top: 130, right: 0, bottom: 100, left: 0 };

  return (
    <BarGraphMainDivBox>
      <ChartWrapper>
        <InnerChartContainer width={dynamicWidth}>
          <ResponsiveBar
            data={chartData}
            keys={["MC_Price", "Sell_Price_View"]}
            indexBy="EQ_NO"
            margin={commonMargin}
            padding={0.6}
            colors={({ id }) =>
              id === "MC_Price"
                ? ColoPicks.find((item) => item.code === types).color
                : "#efefef"
            }
            enableLabel={false}
            enableGridY={false}
            axisLeft={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 10,
              renderTick: (tick) => {
                const item = chartData.find((d) => d.EQ_NO === tick.value);

                return (
                  <g transform={`translate(${tick.x},${tick.y})`}>
                    <text
                      y={22}
                      textAnchor="middle"
                      style={{ fontSize: 12, fontWeight: "bold" }}
                    >
                      {item?.Models}
                    </text>
                    <text y={38} textAnchor="middle" style={{ fontSize: 11 }}>
                      {`#${item?.CHNG_CONT?.split("#")[1]?.split("호기")[0]}`}_
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
            layers={[
              "grid",
              "axes",
              "bars",
              "markers",
              "legends",
              ({ bars, innerWidth, innerHeight }) => (
                <g>
                  <line
                    x1={0}
                    x2={innerWidth} // 차트 전체 너비만큼 오른쪽으로 쭈욱
                    y1={innerHeight} // 차트 바닥 면 높이
                    y2={innerHeight} // 동일한 높이로 수평선 유지
                    stroke="lightgray" // 선 색상 (글자들과 어울리는 회색)
                    strokeWidth={2} // 선 두께
                  />
                  {bars.map((bar) => {
                    if (bar.data.id === "MC_Price") {
                      return (
                        <text
                          key={`${bar.key}-mc`}
                          x={bar.x + bar.width / 2}
                          y={bar.y + bar.height / 2}
                          textAnchor="middle"
                          dominantBaseline="central"
                          style={{
                            fill:
                              bar.data.data.Segment === "Module"
                                ? "black"
                                : "#ffffff",
                            fontSize: "14px",
                            fontWeight: "bold",
                            pointerEvents: "none",
                          }}
                        >
                          {bar.data.data.MC_Price}
                        </text>
                      );
                    } else {
                      const percent = bar.data.data.Sell_Price;
                      return (
                        <text
                          key={`${bar.key}-percent`}
                          x={bar.x + bar.width / 2}
                          y={bar.y - 6}
                          textAnchor="middle"
                          dominantBaseline="baseline"
                          style={{
                            fill: "gray",
                            fontSize: "15px",
                            fontWeight: 700,
                            pointerEvents: "none",
                          }}
                        >
                          {percent.toLocaleString()}
                        </text>
                      );
                    }
                  })}
                </g>
              ),
            ]}
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
