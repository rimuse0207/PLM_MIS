import React from "react";
import { AnnualRevenueMainDivBox } from "../AnnualRevenue/AnnualRevenue";
import styled from "styled-components";

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
      /* height: 30px; */
      width: 95%;
      background-color: orange;
      line-height: 30px;
      color: #fff;
      font-weight: bolder;
      font-size: 20px;
    }
  }
`;

const CompletedOrders = () => {
  return (
    <AnnualRevenueMainDivBox>
      <div className="MainContainer">
        <div className="Title">
          <h4>Completed Orders</h4>
        </div>
        <div className="MainContent">
          <h2>95%</h2>
        </div>

        <CompletedOrdersMainDivBox>
          <div className="BackgroundContainer">
            <div className="ActualContainer">19/20</div>
          </div>
        </CompletedOrdersMainDivBox>
      </div>
    </AnnualRevenueMainDivBox>
  );
};
export default CompletedOrders;
