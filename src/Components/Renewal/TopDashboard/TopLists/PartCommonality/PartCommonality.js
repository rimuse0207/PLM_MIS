import React from "react";
import { AnnualRevenueMainDivBox } from "../AnnualRevenue/AnnualRevenue";

const PartCommonality = () => {
  return (
    <AnnualRevenueMainDivBox>
      <div className="MainContainer">
        <div className="Title">
          <h4>Part Commonality Rate</h4>
        </div>
        <div className="MainContent">
          <h2>25%</h2>
        </div>
        <div className="subContent">
          <span className="colorChangeContent" style={{ color: "red" }}>
            {" "}
            + 2%p{" "}
          </span>
          <sapn className="noColorChangeContent">YoY</sapn>
        </div>
      </div>
    </AnnualRevenueMainDivBox>
  );
};
export default PartCommonality;
