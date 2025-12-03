import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import styled from "styled-components";

export const BarsMainDivBox = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  .Unit_Container {
    position: absolute;
    top: 00px;
    right: 80px;
  }
`;

const Bars = ({ Bar_State, NowSelectGraphButton }) => {
  // 시각화 전용 데이터 가공 (원본은 그대로)
  const adjustedData = Bar_State.filter((item) => {
    if (NowSelectGraphButton === "Equipment") {
      if (item.WO_TYPE === "E") {
        return item;
      }
    } else if (NowSelectGraphButton === "Board") {
      if (item.WO_TYPE !== "E") {
        return item;
      }
    }
  }).map((item) => ({
    ...item,
    profit: item.price - item.MC,
  }));
  const maxValue =
    Math.max(
      ...Bar_State.filter((item) => {
        if (NowSelectGraphButton === "Equipment") {
          if (item.WO_TYPE === "E") {
            return item;
          }
        } else if (NowSelectGraphButton === "Board") {
          if (item.WO_TYPE !== "E") {
            return item;
          }
        }
      }).map((d) => Math.max(d.MC, d.price))
    ) * 1.3;
  const DicideTicks =
    maxValue >= 5000
      ? 1000
      : maxValue >= 4000
      ? 800
      : maxValue >= 3000
      ? 600
      : maxValue >= 2000
      ? 350
      : maxValue >= 1000
      ? 200
      : maxValue >= 500
      ? 100
      : maxValue >= 100
      ? 20
      : 5;

  return (
    <BarsMainDivBox>
      <ResponsiveBar
        data={adjustedData}
        maxValue={maxValue}
        keys={["MC", "profit"]}
        indexBy="id"
        margin={{ top: 150, right: 0, bottom: 70, left: 100 }}
        padding={0.6}
        groupMode="stacked"
        colors={["skyblue", "gray"]}
        colorBy="id"
        theme={{
          labels: { text: { fontSize: "1.5vmin", fill: "#000000" } },
          legends: { text: { fontSize: "1.5vmin", fill: "#000000" } },
          axis: {
            legend: { text: { fontSize: "1.2vmin", fill: "#000000" } },
            ticks: { text: { fontSize: "1.5vmin", fill: "#000000" } },
          },
        }}
        axisBottom={{
          renderTick: (tick) => {
            const target = Bar_State.find((e) => e.id === tick.value);
            return (
              <g transform={`translate(${tick.x},${tick.y + 20})`}>
                <text
                  textAnchor="middle"
                  dominantBaseline="hanging"
                  style={{ fontSize: "1.3vmin", fill: "#000" }}
                >
                  {target?.equipments}
                </text>
                <text
                  textAnchor="middle"
                  dominantBaseline="hanging"
                  y={15} // 두 번째 줄 내려쓰기
                  style={{ fontSize: "1.1vmin", fill: "#666" }}
                >
                  {target?.WO_TYPE === "E" ? "장비" : "Board"}
                </text>
                <text
                  textAnchor="middle"
                  dominantBaseline="hanging"
                  y={30} // 세 번째 줄 내려쓰기
                  style={{ fontSize: "1.1vmin", fill: "#666" }}
                >
                  {target?.WO_TYPE === "E"
                    ? `#${target?.CHNG_CONT.split("#")[1]}`
                    : `${target?.QTY}매`}
                </text>
              </g>
            );
          },
        }}
        axisLeft={{
          tickSize: 1,
          tickPadding: 20,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: -40,
          tickValues: Array.from(
            { length: Math.ceil(maxValue / DicideTicks) },
            (_, i) => `${(i + 1) * DicideTicks} `
          ),
          format: (value) => Number(value).toLocaleString("ko-kr") + " M",
        }}
        enableGridY={false}
        enableLabel={false}
        legends={[
          {
            dataFrom: "keys",
            anchor: "top-right",
            direction: "row",
            translateX: 30,
            translateY: -110,
            itemWidth: 100,
            itemHeight: 20,
            itemsSpacing: 2,
            symbolSize: 20,
            itemDirection: "left-to-right",
            data: [
              { id: "MC", label: "MC", color: "skyblue" },
              { id: "profit", label: "단가", color: "gray" },
            ],
          },
        ]}
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
                const MC = bar.data.data.MC;
                if (!price || price === 0) return 0;
                const percent = (MC / price) * 100 || 0;

                return (
                  <text
                    key={`${bar.key}-percent`}
                    x={bar.x + bar.width / 2}
                    y={bar.y - 30}
                    textAnchor="middle"
                    style={{
                      fill: "black",
                      fontSize: "1.5vmin",
                      fontWeight: "bold",
                      pointerEvents: "none", // 마우스 이벤트 막기
                    }}
                  >
                    {percent.toFixed(1)}%
                  </text>
                );
              });
          },
        ]}
        tooltip={({ id, value, indexValue, data }) => {
          if (id === "profit") {
            return (
              <div
                style={{
                  padding: "6px 9px",
                  background: "white",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  color: "black",
                  fontSize: "2.0vmin",
                }}
              >
                <strong>
                  {Bar_State.find((e) => e.id === indexValue)?.equipments}
                </strong>
                <br />
                단가: {data.price.toLocaleString("ko-kr")} M
              </div>
            );
          } else {
            return (
              <div
                style={{
                  padding: "6px 9px",
                  background: "white",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  color: "black",
                  fontSize: "2.0vmin",
                }}
              >
                <strong>
                  {Bar_State.find((e) => e.id === indexValue)?.equipments}
                </strong>
                <br />
                MC: {Number(data.MC.toFixed(1)).toLocaleString("ko-kr")} M
              </div>
            );
          }
        }}
      />
    </BarsMainDivBox>
  );
};

export default Bars;
