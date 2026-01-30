import React from "react";
import TopListsContainer from "./TopLists/TopListsContainer";
import styled from "styled-components";

const TopDashboardMainPageMainDivBox = styled.div`
  margin-top: 40px;
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
  .FirstContainer {
    display: flex;
    flex-flow: wrap;
    width: 50%;
    justify-content: space-around;
  }
`;

const TopDashboardMainPage = ({ topData = [] }) => {
  const chunkSize = 2;

  return (
    <TopDashboardMainPageMainDivBox>
      {topData
        .reduce((acc, cur, idx) => {
          if (idx % chunkSize === 0) {
            acc.push(topData.slice(idx, idx + chunkSize));
          }
          return acc;
        }, [])
        .map((group, i) => (
          <div className="FirstContainer" key={i}>
            {group.map((item, j) => (
              <TopListsContainer key={j} type={item.type} data={item.data} />
            ))}
          </div>
        ))}
    </TopDashboardMainPageMainDivBox>
  );
};

export default TopDashboardMainPage;
