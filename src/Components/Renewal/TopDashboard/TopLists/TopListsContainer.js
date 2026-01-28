import React from "react";
import styled from "styled-components";
import AnnualRevenue from "./AnnualRevenue/AnnualRevenue";
import CompletedOrders from "./CompletedOrders/CompletedOrders";
import AverageRatio from "./AverageRatio/AverageRatio";
import PartCommonality from "./PartCommonality/PartCommonality";

const TopListsContainerMainDivBox = styled.div`
  border: 1px solid darkgray;
  width: 23%;
  min-width: 460px;
  height: 200px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const TopListsContainer = ({ type }) => {
  const typeRendering = () => {
    switch (type) {
      case "AnnualRevenue":
        return <AnnualRevenue></AnnualRevenue>;
      case "CompletedOrders":
        return <CompletedOrders></CompletedOrders>;
      case "AverageRatio":
        return <AverageRatio></AverageRatio>;
      case "PartCommonality":
        return <PartCommonality></PartCommonality>;
      default:
        return <div></div>;
    }
  };
  return (
    <TopListsContainerMainDivBox>{typeRendering()}</TopListsContainerMainDivBox>
  );
};

export default TopListsContainer;
