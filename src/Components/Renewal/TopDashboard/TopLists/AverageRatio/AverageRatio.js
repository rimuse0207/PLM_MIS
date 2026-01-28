import React from "react";
import { AnnualRevenueMainDivBox } from "../AnnualRevenue/AnnualRevenue";

const AverageRatio = () => {
  return (
    <AnnualRevenueMainDivBox>
      <div className="MainContainer">
        <div className="Title">
          <select>
            <option>Total</option>
          </select>
          <h4>Average MC Ratio</h4>
        </div>
        <div className="MainContent">
          <h2>55%</h2>
        </div>
        <div className="subContent">
          <span className="colorChangeContent" style={{ color: "blue" }}>
            {" "}
            + 8%p{" "}
          </span>
          <sapn className="noColorChangeContent">YoY</sapn>
        </div>
      </div>
    </AnnualRevenueMainDivBox>
  );
};
export default AverageRatio;
