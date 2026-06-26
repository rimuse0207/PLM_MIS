import React, { useEffect, useState } from "react";
import { AnnualRevenueMainDivBox } from "../AnnualRevenue/AnnualRevenue";
import styled, { keyframes } from "styled-components";
import { diviceNumber } from "../../../RenewalMainPage"; // 필요한 경우 주석 해제
import { ResponsiveLine } from "@nivo/line";

export const CompletedOrdersMainDivBox = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  .BackgroundContainer {
    height: 30px;
    position: relative;
    background-color: lightgray;
    width: 80%;
    .ActualContainer {
      position: absolute;
      top: 0px;
      right: 0px;
      width: 95%;
      background-color: orange;
      line-height: 30px;
      color: #fff;
      font-weight: bolder;
      font-size: 20px;
    }
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimatedItemBox = styled.div`
  font-size: 15px;
  padding-top: 10px;
  bottom: 20px;
  width: 100%;
  text-align: center;

  animation: ${slideUp} 0.5s ease-out forwards;

  .index-num {
    color: #4e73df;
    font-weight: bold;
    margin-right: 8px;
  }

  .unit {
    font-size: 16px;
    margin-left: 2px;
  }
`;

const customTheme = {
  axis: {
    domain: {
      line: {
        stroke: "lightgray",
        strokeWidth: 2,
      },
    },
  },
  labels: {
    text: {
      fontSize: 20,
      fontWeight: "bold",
      fill: "#333333",
    },
  },
  legends: {
    text: {
      fontSize: 20,
    },
  },
  text: {
    fontSize: 14,
  },
};

const CompletedOrders = ({
  data = [],
  subTitle,
  autoShowing = [],
  showingIndex,
}) => {
  const Makingdata = [
    {
      id: "my-line",
      data,
    },
  ];

  return (
    <AnnualRevenueMainDivBox>
      <div className="MainContainer">
        <div className="Title krSuc">
          <h4>월별 재고 금액</h4>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "calc(100% - 45px)",
          position: "absolute",
          top: "40px",
          left: "0px",
          background: "#fff",
        }}
      >
        <ResponsiveLine
          data={Makingdata}
          margin={{ top: 50, right: 40, bottom: 50, left: 40 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: 0,
            stacked: false,
            reverse: false,
          }}
          theme={customTheme}
          colors={["#00D8FF"]}
          lineWidth={3}
          layers={[
            "grid",
            "markers",
            "areas",
            "axes",
            "crosshair",
            "lines",
            "points",
            "slices",
            "mesh",
            "legends",
          ]}
          enablePoints={true}
          pointSize={10}
          pointColor="#ffffff"
          pointBorderWidth={2}
          pointBorderColor="#00D8FF"
          enablePointLabel={true}
          pointLabel="data.yFormatted"
          pointLabelYOffset={-15}
          axisLeft={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
          }}
          enableGridX={false}
          enableGridY={false}
          enableArea={true}
          areaOpacity={1}
          defs={[
            {
              id: "lineGradient",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#8dedf8", stopOpacity: 0.5 },
                { offset: 90, color: "#ecfcfe", stopOpacity: 0.5 },
                { offset: 100, color: "#ecfcfe", stopOpacity: 0 },
              ],
            },
          ]}
          fill={[{ match: "*", id: "lineGradient" }]}
          useMesh={true}
          tooltip={({ point }) => {
            const topList = point.data.TopList || [];

            return (
              <div
                style={{
                  background: "white",
                  padding: "12px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
                  {point.data.x} Top 3
                </div>

                {topList.length > 0 && (
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "20px",
                      fontSize: "13px",
                      color: "#555",
                    }}
                  >
                    {topList.map((item, index) => (
                      <li key={item.ItemSName}>
                        <AnimatedItemBox style={{ textAlign: "start" }}>
                          <span className="index-num">{index + 1}</span>
                          {item.ItemSName || "기타"}_
                          {(item.Price / diviceNumber).toFixed(0)}억원
                        </AnimatedItemBox>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          }}
        />
      </div>
    </AnnualRevenueMainDivBox>
  );
};

export default CompletedOrders;
