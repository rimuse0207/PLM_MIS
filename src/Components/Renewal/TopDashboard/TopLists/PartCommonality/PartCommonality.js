import React, { useEffect, useMemo, useState } from "react";
import { AnnualRevenueMainDivBox } from "../AnnualRevenue/AnnualRevenue";
import { VscTriangleUp } from "react-icons/vsc";
import { diviceNumber } from "../../../RenewalMainPage";
import { AnimatedItemBox } from "../CompletedOrders/CompletedOrders";

const PartCommonality = ({
  data,
  subTitle,
  autoShowing = [],
  showingIndex,
}) => {
  const MakingPercent = (SelectData) => {
    if (!SelectData.sum_reUse || !SelectData.sum_cnt) return 0;
    return Math.round((SelectData.sum_reUse / SelectData.sum_cnt) * 100) || 0;
  };

  const safeIndex = Math.min(showingIndex, autoShowing.length - 1);
  const currentItem = autoShowing[safeIndex];

  return (
    <AnnualRevenueMainDivBox>
      <div className="MainContainer">
        <div className="Title">
          <h4>부품 공용화율</h4>
        </div>

        <div className="FloatContainer">
          <div className="RightContainer" style={{ width: "100%" }}>
            <div className="MainContent">
              <div className="WorkOrderContainer">
                <h2>
                  {MakingPercent(data.Now)}
                  <span style={{ fontSize: "40px" }}>{subTitle}</span>
                </h2>
              </div>
              <div className="bottomBoard">
                {currentItem && (
                  <AnimatedItemBox key={showingIndex}>
                    <span className="index-num">{safeIndex + 1} </span>
                    {currentItem.partTypeName}
                    {"_"}
                    <strong>{Math.round(currentItem.reuseRate)}</strong>
                    <span className="unit">%</span>
                  </AnimatedItemBox>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnnualRevenueMainDivBox>
  );
};
export default PartCommonality;
