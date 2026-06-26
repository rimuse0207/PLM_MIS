import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// import { diviceNumber } from "../../../RenewalMainPage";
import { ColorPicks } from "./BarsContainer";

export const BarGraphMainDivBox = styled.div`
  background-color: #fff;
  width: 100%;
  height: 95%;
  display: flex;
  position: relative;
`;

export const ChartWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1;

  &::-webkit-scrollbar {
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    background: lightgray;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ddddff;
    border-radius: 10px;
    border: 1px solid #fff;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #ccccff;
  }
`;

export const InnerChartContainer = styled.div`
  width: ${(props) => props.width};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const BarGraph = ({ data, types }) => {
  const Select_Date_State = useSelector(
    (state) => state.Select_Date_Reducer_State.Select_Date_State,
  );

  const wrapperRef = useRef(null);
  const [wrapperWidth, setWrapperWidth] = useState(0);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setWrapperWidth(entries[0].contentRect.width);
    });
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  const MAX_VISIBLE_ITEMS = 7;
  const ITEM_WIDTH = 130;

  const isScrollable = data.length > MAX_VISIBLE_ITEMS;
  const totalPixelWidth = isScrollable
    ? data.length * ITEM_WIDTH
    : wrapperWidth;
  const dynamicWidth = isScrollable ? `${totalPixelWidth}px` : "100%";

  const BAR_PADDING = 0.6;

  const barMargin = { top: 30, right: 0, bottom: 120, left: 0 };
  let lineMargin = { top: 40, right: 0, bottom: 0, left: 0 };

  if (totalPixelWidth > 0 && data.length > 0) {
    const innerBarWidth = totalPixelWidth - barMargin.left - barMargin.right;

    const stepWidth = innerBarWidth / (data.length + BAR_PADDING);

    const centerOffset = (0.5 + BAR_PADDING / 2) * stepWidth;

    lineMargin = {
      top: 40,
      right: barMargin.right + centerOffset,
      bottom: 0,
      left: barMargin.left + centerOffset,
    };
  }

  const chartData = data.map((d) => ({
    ...d,
    Sell_Price_View: d.Sell_Price - d.MC_Price,
    MC_Rate:
      d.Sell_Price > 0 ? Math.round((d.MC_Price / d.Sell_Price) * 100) : 0,
  }));

  const lineChartData = [
    {
      id: "MC_Rate_Line",
      data: chartData.map((d) => ({ x: d.EQ_NO, y: d.MC_Rate })),
    },
  ];

  return (
    <BarGraphMainDivBox>
      <ChartWrapper ref={wrapperRef}>
        {wrapperWidth === 0 && !isScrollable ? null : (
          <InnerChartContainer width={dynamicWidth}>
            <div style={{ width: "100%", height: "130px" }}>
              <ResponsiveLine
                data={lineChartData}
                margin={lineMargin}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", min: 0, max: 100 }}
                axisLeft={null}
                axisBottom={null}
                enableGridX={false}
                enableGridY={false}
                colors={[types === "Module" ? "#1146af" : "#FFBB00"]}
                lineWidth={3}
                enablePoints={true}
                pointSize={8}
                pointColor="#ffffff"
                pointBorderWidth={3}
                pointBorderColor={types === "Module" ? "#1146af" : "#FFBB00"}
                enablePointLabel={true}
                pointLabel={(d) => {
                  return d.data.y + "%";
                }}
                theme={{
                  text: {
                    fontSize: 17, // 글자 크기
                    fill: types === "Module" ? "#1146af" : "#FFBB00",
                    fontWeight: "bold",
                  },
                }}
                pointLabelYOffset={-15}
                useMesh={true}
                tooltip={({ point }) => (
                  <div
                    style={{
                      padding: 8,
                      background: "#fff",
                      border: "1px solid #ccc",
                    }}
                  >
                    <strong>MC율</strong> : {point.data.y}%
                  </div>
                )}
              />
            </div>

            <div style={{ width: "100%", flex: 1, height: "370px" }}>
              <ResponsiveBar
                data={chartData}
                keys={["MC_Price", "Sell_Price_View"]}
                indexBy="EQ_NO"
                margin={barMargin}
                padding={0.6}
                colors={({ id }) =>
                  id === "MC_Price"
                    ? ColorPicks.find((item) => item.code === types).color
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
                        <text
                          y={38}
                          textAnchor="middle"
                          style={{ fontSize: 11 }}
                        >
                          {`#${item?.CHNG_CONT?.split("#")[1]?.split("호기")[0]}`}
                          _
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
                        x2={innerWidth}
                        y1={innerHeight}
                        y2={innerHeight}
                        stroke="lightgray"
                        strokeWidth={2}
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
                    <strong>{id === "Sell_Price_View" ? "판가" : "MC"}</strong>{" "}
                    :{" "}
                    {(id === "Sell_Price_View"
                      ? data.Sell_Price
                      : data.MC_Price
                    ).toLocaleString()}
                  </div>
                )}
              />
            </div>
          </InnerChartContainer>
        )}
      </ChartWrapper>
    </BarGraphMainDivBox>
  );
};

export default BarGraph;
