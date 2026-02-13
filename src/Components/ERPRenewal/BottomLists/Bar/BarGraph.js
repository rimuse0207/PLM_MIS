import { ResponsiveBar } from "@nivo/bar";
import React from "react";
import { BarsMainDivBox } from "../../../Home/Dashboard/Home/Graphs/GraphsLists/Bars";
import moment from "moment";

const BarGraph = () => {
  const data = [
    {
      dates: "202601",
      profit: 174,
      price: 174,
    },
    {
      dates: "202602",
      profit: 274,
      price: 274,
    },
    {
      dates: "202603",
      profit: 374,
      price: 374,
    },
    {
      dates: "202604",
      profit: 474,
      price: 474,
    },
    {
      dates: "202605",
      profit: 374,
      price: 374,
    },
    {
      dates: "202606",
      profit: 274,
      price: 274,
    },
    {
      dates: "202607",
      profit: 174,
      price: 174,
    },
    {
      dates: "202608",
      profit: 274,
      price: 274,
    },
    {
      dates: "202609",
      profit: 374,
      price: 374,
    },
    {
      dates: "202610",
      profit: 474,
      price: 474,
    },
    {
      dates: "202611",
      profit: 374,
      price: 374,
    },
    {
      dates: "202612",
      profit: 274,
      price: 274,
    },
  ];
  return (
    <BarsMainDivBox style={{ height: "100%" }}>
      <ResponsiveBar
        data={data}
        maxValue={400}
        keys={["profit"]}
        indexBy="dates"
        margin={{ top: 200, right: 0, bottom: 40, left: 0 }}
        padding={0.7}
        groupMode="stacked"
        colors={["rgb(50, 85, 235)", "gray"]}
        colorBy="id"
        theme={{
          labels: { text: { fontSize: "2vmin", fill: "#000000" } },
          legends: { text: { fontSize: "2vmin", fill: "#000000" } },
          axis: {
            legend: { text: { fontSize: "1.5vmin", fill: "#000000" } },
            ticks: { text: { fontSize: "1.5vmin", fill: "#000000" } },
          },
        }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: 20,
          format: (value) => `${moment(value.toLocaleString()).format("MM월")}`,
        }}
        axisLeft={null}
        markers={[
          {
            axis: "y",
            value: 0,
            lineStyle: { stroke: "lightgray", strokeWidth: 1 }, // 실선 스타일
          },
        ]}
        enableGridY={false}
        enableLabel={false}
        layers={[
          "grid",
          "axes",
          "bars",
          "markers",
          "legends",
          // ✅ 퍼센트 텍스트 추가 layer
          ({ bars }) => {
            return bars
              .filter((bar) => bar.data.id === "profit")
              .map((bar) => {
                const price = bar.data.data.price;

                if (!price || price === 0) return null;

                return (
                  <text
                    key={`${bar.key}-percent`}
                    x={bar.x + bar.width / 2}
                    y={bar.y - 30}
                    textAnchor="middle"
                    style={{
                      fill: "black",
                      fontSize: "2vmin",
                      fontWeight: "bold",
                      pointerEvents: "none", // 마우스 이벤트 막기
                    }}
                  >
                    {price.toLocaleString("ko-KR")}
                  </text>
                );
              });
          },
        ]}
        tooltip={({ id, value, indexValue, data }) => {
          return (
            <div
              style={{
                padding: "6px 9px",
                background: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                color: "black",
                fontSize: "2vmin",
              }}
            >
              <strong>{moment(indexValue).format("YYYY년 MM월")}</strong>
              <br />
              재고 금액: {data.price.toLocaleString("ko-KR")} 억원
            </div>
          );
        }}
      />
    </BarsMainDivBox>
  );
};
export default BarGraph;
