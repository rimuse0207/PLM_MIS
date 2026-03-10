import React, { useEffect, useState } from "react";
import { AnnualRevenueMainDivBox } from "../AnnualRevenue/AnnualRevenue";
import styled, { keyframes } from "styled-components";
import { diviceNumber } from "../../../RenewalMainPage";

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
      width: 95%;
      background-color: orange;
      line-height: 30px;
      color: #fff;
      font-weight: bolder;
      font-size: 20px;
    }
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimatedItemBox = styled.div`
  font-size: 20px;
  padding-top: 10px;
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;

  animation: ${slideUp} 0.5s ease-out forwards;

  .index-num {
    color: #4e73df;
    font-weight: bold;
    margin-right: 8px;
  }

  .unit {
    font-size: 16px;
    margin-left: 2px;
  }
`;

const CompletedOrders = ({
  data,
  subTitle,
  autoShowing = [],
  showingIndex,
}) => {
  const safeIndex = Math.min(showingIndex, autoShowing.length - 1);
  const currentItem = autoShowing[safeIndex];

  return (
    <AnnualRevenueMainDivBox>
      <div className="MainContainer">
        <div className="Title krSuc">
          <h4>원부자재 재고</h4>
        </div>
        <div className="MainContent">
          <div className="WorkOrderContainer">
            <h2>
              {data?.price?.toLocaleString()}
              <span style={{ fontSize: "40px" }}>{subTitle}</span>
            </h2>
          </div>
        </div>
        {/* <div
          style={{
            fontSize: "20px",
            paddingTop: "10px",
            position: "absolute",
            bottom: "20px",
          }}
        >
          {showingIndex + 1} {autoShowing[showingIndex]?.ItemSName}_
          {Number(autoShowing[showingIndex]?.Price / diviceNumber).toFixed(0)}
          억원
        </div>
         */}
        {/* 데이터가 있을 때만 렌더링 */}
        {currentItem && (
          <AnimatedItemBox key={showingIndex}>
            <span className="index-num">{safeIndex + 1}</span>
            {currentItem.ItemSName}{" "}
            <strong>
              {Number(currentItem.Price / diviceNumber).toFixed(0)}
            </strong>
            <span className="unit">억원</span>
          </AnimatedItemBox>
        )}
      </div>
    </AnnualRevenueMainDivBox>
  );
};
export default CompletedOrders;
