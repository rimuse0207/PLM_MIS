import React, { useMemo, useState } from "react";
import { AnnualRevenueMainDivBox } from "../AnnualRevenue/AnnualRevenue";
import { VscTriangleUp } from "react-icons/vsc";

export const SegmentLists = [
  {
    id: "CLT",
    label: "CLT",
    code: "CLT",
  },
  {
    id: "MBT",
    label: "MBT",
    code: "MBT",
  },
  {
    id: "Storage",
    label: "Storage",
    code: "Storage",
  },
  {
    id: "DC/Module",
    label: "DC/Module",
    code: "Module",
  },
  {
    id: "SoC",
    label: "SoC",
    code: "SOC",
  },
];

const AverageRatio = ({ data }) => {
  const [ChooseSelect, setChooseSelect] = useState("all");
  const MakingAverage = (MCData) => {
    if (!MCData.length) return 0;
    return (
      Math.round(
        MCData.reduce((sum, item) => sum + item.MCRate, 0) / MCData.length,
      ) || 0
    );
  };
  const filteredData = useMemo(() => {
    const make = (SelectType) => {
      if (ChooseSelect === "all") return data[SelectType] ?? [];
      return (
        data[SelectType]?.filter((item) => item.Segment === ChooseSelect) ?? []
      );
    };

    return {
      NowYear: make("NowYear"),
      PreYear: make("PreYear"),
    };
  }, [data, ChooseSelect]);

  return (
    <AnnualRevenueMainDivBox>
      <div className="MainContainer">
        <div className="Title" style={{ display: "flex", flexFlow: "wrap" }}>
          <h4>Average MC Ratio</h4>
          <select
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
          </select>
        </div>
        <div className="MainContent">
          <h2>
            {MakingAverage(filteredData.NowYear)}%
            <div
              className={`UPDownData ${MakingAverage(filteredData.NowYear) - MakingAverage(filteredData.PreYear) > 0 ? "Down" : "Up"}`}
            >
              <VscTriangleUp />
              <span>
                {Math.abs(
                  MakingAverage(filteredData.NowYear) -
                    MakingAverage(filteredData.PreYear),
                )}
                %p
              </span>
            </div>
          </h2>
        </div>
      </div>
    </AnnualRevenueMainDivBox>
  );
};
export default AverageRatio;
