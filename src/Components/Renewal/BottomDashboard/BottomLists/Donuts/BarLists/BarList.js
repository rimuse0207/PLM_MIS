import React from "react";
import { CompletedOrdersMainDivBox } from "../../../../TopDashboard/TopLists/CompletedOrders/CompletedOrders";
import styled from "styled-components";

const BarListMainDivBox = styled.div`
  width: 80%;
  .BackgroundContainer {
    position: relative;
    height: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: lightgray;
    .ActualContainer {
      position: absolute;
      right: 0px;
      top: 0px;
      height: 100%;
      background-color: green;
      width: 50%;
    }
    .TextContainer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      width: 100%;
      background-color: none;
      position: absolute;
      top: 0px;
      left: 0px;

      div {
        margin-left: 10px;
        margin-right: 10px;
        font-weight: bolder;
        font-size: 1.2em;
      }
    }
  }
`;

const BarList = ({ list }) => {
  return (
    <BarListMainDivBox>
      <div className="BackgroundContainer">
        <div
          className="ActualContainer"
          style={{
            backgroundColor: list.color,
            width: `${Number((list.value / list.SumValue) * 100).toFixed(0)}%`,
          }}
        ></div>
        <div className="TextContainer">
          <div>{list.label}</div>
          <div>{list.value}</div>
        </div>
      </div>
    </BarListMainDivBox>
  );
};

export default BarList;
