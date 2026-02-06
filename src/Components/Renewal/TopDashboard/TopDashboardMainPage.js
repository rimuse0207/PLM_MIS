import React from "react";
import TopListsContainer from "./TopLists/TopListsContainer";
import styled from "styled-components";

const TopDashboardMainPageMainDivBox = styled.div`
  margin-top: 40px;
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
  .FirstContainer {
    display: flex;
    flex-flow: wrap;
    width: 100%;
    justify-content: space-evenly;
  }
`;

const TopDashboardMainPage = ({ topData = [] }) => {
  return (
    <TopDashboardMainPageMainDivBox>
      <div className="FirstContainer">
        {topData.map((item, j) => (
          <TopListsContainer key={j} type={item.type} data={item.data} />
        ))}
      </div>
    </TopDashboardMainPageMainDivBox>
  );
};

export default TopDashboardMainPage;
