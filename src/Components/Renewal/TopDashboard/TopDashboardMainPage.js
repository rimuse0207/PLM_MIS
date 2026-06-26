import React from "react";
import TopListsContainer from "./TopLists/TopListsContainer";
import styled from "styled-components";

export const TopDashboardMainPageMainDivBox = styled.div`
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

const TopDashboardMainPage = ({ topData = [], showingIndex }) => {
  return (
    <TopDashboardMainPageMainDivBox>
      <div className="FirstContainer">
        {topData?.slice(0, 4)?.map((item, j) => (
          <TopListsContainer
            key={j}
            type={item.type}
            data={item.data}
            autoShowing={item.autoShowingList}
            showingIndex={showingIndex}
            topData={topData}
          />
        ))}
      </div>
    </TopDashboardMainPageMainDivBox>
  );
};

export default TopDashboardMainPage;
