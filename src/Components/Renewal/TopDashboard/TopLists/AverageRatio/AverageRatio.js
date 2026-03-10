import React, { useMemo, useState } from "react";
import { AnnualRevenueMainDivBox } from "../AnnualRevenue/AnnualRevenue";
import { VscTriangleUp } from "react-icons/vsc";
import { AnimatedItemBox } from "../CompletedOrders/CompletedOrders";

export const SegmentLists = [
  {
    id: "CLT",
    label: "CLT",
    code: "CLT",
    color: "#00c800",
  },
  {
    id: "MBT",
    label: "MBT",
    code: "MBT",
    color: "#0066ff",
  },
  {
    id: "Storage",
    label: "Storage",
    code: "Storage",
    color: "#ff0000",
  },
  {
    id: "DC/Module",
    label: "DC/Module",
    code: "Module",
    color: "#ffc000",
  },
  {
    id: "SoC",
    label: "SoC",
    code: "SoC",
    color: "#6600cc",
  },
];

const AverageRatio = ({ data, subTitle, autoShowing = [], showingIndex }) => {
  const [ChooseSelect, setChooseSelect] = useState("all");
  const safeIndex = Math.min(showingIndex, autoShowing.length - 1);
  const currentItem = autoShowing[safeIndex];
  const MakingAverage = (MCData) => {
    if (!MCData.length) return 0;
    return (
      Math.round(
        MCData.reduce((sum, item) => sum + item.MCRate, 0) / MCData.length,
      ) || 0
    );
  };
  const filteredData = useMemo(() => {
    const make = () => {
      if (ChooseSelect === "all") return data ?? [];
      return data.filter((item) => item.Segment === ChooseSelect) ?? [];
    };

    return make();
  }, [data, ChooseSelect]);

  return (
    <AnnualRevenueMainDivBox>
      <div className="MainContainer">
        <div className="Title" style={{ display: "flex", flexFlow: "wrap" }}>
          <h4>실적 MC율</h4>
          {/* <select
            value={ChooseSelect}
            onChange={(data) => setChooseSelect(data.target.value)}
          >
            <option value="all">Total</option>
            {SegmentLists.map((list) => {
              return (
                <option key={list.code} value={list.code}>
                  {list.label}
                </option>
              );
            })}
          </select> */}
        </div>
        <div className="MainContent">
          <h2>
            {MakingAverage(filteredData)}
            <span style={{ fontSize: "40px" }}>{subTitle}</span>
            {/* <div
              className={`UPDownData ${MakingAverage(filteredData.NowYear) - MakingAverage(filteredData.PreYear) > 0 ? "Up" : "Down"}`}
            >
              <div className="IconContainer">
                <VscTriangleUp />
              </div>
              <span>
                {Math.abs(
                  MakingAverage(filteredData.NowYear) -
                    MakingAverage(filteredData.PreYear),
                )}
                %p
              </span>
            </div> */}
          </h2>
        </div>
        {currentItem && (
          <AnimatedItemBox key={showingIndex}>
            {/* <span className="index-num">{safeIndex + 1}</span> */}
            {currentItem.Segment}
            {" #"}
            {currentItem.CHNG_CONT.split("#")[1]}{" "}
            <strong>{Number(currentItem.MCRate).toFixed(0)}</strong>
            <span className="unit">%</span>
          </AnimatedItemBox>
        )}
      </div>
    </AnnualRevenueMainDivBox>
  );
};
export default AverageRatio;
