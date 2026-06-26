import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AnnualRevenue from "./AnnualRevenue/AnnualRevenue";
import CompletedOrders from "./CompletedOrders/CompletedOrders";
import AverageRatio from "./AverageRatio/AverageRatio";
import PartCommonality from "./PartCommonality/PartCommonality";

const TopListsContainerMainDivBox = styled.div`
  border: 0.5px solid #e7e6e6;

  /* min-width: 460px; */
  height: 250px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 5px 1px rgba(189, 215, 238, 0.6);
  .firstContainer {
    width: 600px;
    height: 100%;
  }
  .secondContainer {
    width: 300px;
    height: 100%;
  }
`;

const TopListsContainer = ({
  type,
  data,
  autoShowing,
  showingIndex,
  topData,
}) => {
  const typeRendering = () => {
    switch (type) {
      case "AnnualRevenue":
        return (
          <div className="firstContainer">
            <AnnualRevenue
              data={data}
              subTitle="억원"
              autoShowing={autoShowing}
              showingIndex={showingIndex}
              subTopData={
                topData?.find((item) => item.type === "AverageRatio").data
              }
              autoShowingPercent={
                topData?.find((item) => item.type === "AverageRatio")
                  .autoShowingList
              }
            ></AnnualRevenue>
          </div>
        );
      case "WorkOrders":
        return (
          <div className="firstContainer">
            <CompletedOrders
              data={data}
              subTitle="억원"
              autoShowing={autoShowing}
              showingIndex={showingIndex}
            ></CompletedOrders>
          </div>
        );
      case "BackLog":
        return (
          <div className="secondContainer">
            <AverageRatio
              data={data}
              subTitle="억원"
              autoShowing={autoShowing}
              showingIndex={showingIndex}
            ></AverageRatio>
          </div>
        );

      case "PartCommonality":
        return (
          <div className="secondContainer">
            <PartCommonality
              data={data}
              subTitle="%"
              autoShowing={autoShowing}
              showingIndex={showingIndex}
            ></PartCommonality>
          </div>
        );
      default:
        return <div></div>;
    }
  };
  return (
    <TopListsContainerMainDivBox>{typeRendering()}</TopListsContainerMainDivBox>
  );
};

export default TopListsContainer;
