import React from "react";
import TopListsContainer from "./TopLists/TopListsContainer";
import styled from "styled-components";

const TopDashboardMainPageMainDivBox = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
`;

const TopDashboardMainPage = () => {
  return (
    <TopDashboardMainPageMainDivBox>
      <TopListsContainer type={"AnnualRevenue"}></TopListsContainer>
      <TopListsContainer type="CompletedOrders"></TopListsContainer>
      <TopListsContainer type={"AverageRatio"}></TopListsContainer>
      <TopListsContainer type={"PartCommonality"}></TopListsContainer>
    </TopDashboardMainPageMainDivBox>
  );
};

export default TopDashboardMainPage;
