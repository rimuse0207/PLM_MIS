import React from "react";
import styled from "styled-components";

export const AnnualRevenueMainDivBox = styled.div`
  height: 100%;
  padding: 0 10px;
  .MainContainer {
    display: flex;
    flex-flow: wrap;
    align-items: space-between;
    height: 100%;
  }
  .Title {
    width: 100%;
    display: flex;
    align-items: center;
    select {
      margin-right: 15px;
      width: 80px;
      height: 20px;
    }
    h4 {
      font-weight: 500;
      font-size: 1.1em;
    }
  }
  .MainContent {
    width: 100%;
    text-align: center;
    font-size: 50px;
    margin: 0px 10px;
  }
  .subContent {
    width: 100%;
    font-weight: bolder;
    text-align: center;
    .colorChangeContent {
      font-size: 18px;
    }
  }
`;

const AnnualRevenue = () => {
  return (
    <AnnualRevenueMainDivBox>
      <div className="MainContainer">
        <div className="Title">
          <h4>Annual Revenue</h4>
        </div>
        <div className="MainContent">
          <h2>65,975</h2>
        </div>

        <div className="subContent">
          <span className="colorChangeContent" style={{ color: "red" }}>
            {" "}
            + 5%{" "}
          </span>
          <sapn className="noColorChangeContent">YoY</sapn>
        </div>
      </div>
    </AnnualRevenueMainDivBox>
  );
};
export default AnnualRevenue;
