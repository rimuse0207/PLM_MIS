import React, { useMemo } from "react";
import { AnnualRevenueMainDivBox } from "../AnnualRevenue/AnnualRevenue";
import { VscTriangleUp } from "react-icons/vsc";

const PartCommonality = ({ data }) => {
  console.log(data.Now[0].sum_reUse, data.Now[0].sum_cnt);

  const MakingPercent = (SelectData) => {
    if (SelectData.length === 0) return 0;
    return (
      Math.round((SelectData[0].sum_reUse / SelectData[0].sum_cnt) * 100) || 0
    );
  };

  const PercentCal = useMemo(() => {
    return MakingPercent(data.Now) - MakingPercent(data.pre);
  }, [data]);

  return (
    <AnnualRevenueMainDivBox>
      <div className="MainContainer">
        <div className="Title">
          <h4>Part Commonality Rate</h4>
        </div>
        <div className="MainContent">
          <h2>
            {MakingPercent(data.Now)}%
            {PercentCal === 0 ? (
              <div
                className="UPDownData"
                style={{
                  background: "#efefef",
                  padding: "0px",
                  color: "gray",
                }}
              >
                No Data
              </div>
            ) : (
              <div
                className={`UPDownData ${PercentCal > 0 ? "RateUp" : "RateDown"}`}
              >
                <div className="IconContainer">
                  <VscTriangleUp />
                </div>
                <span>
                  {Math.abs(PercentCal) || "No Data"}
                  %p
                </span>
              </div>
            )}
          </h2>
        </div>
      </div>
    </AnnualRevenueMainDivBox>
  );
};
export default PartCommonality;
