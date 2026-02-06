import React from "react";
import styled from "styled-components";
import BottomListsContainer from "./BottomLists/BottomListsContainer";

const BottomDashboardMainPageMainDivBox = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
`;

export const ColorArray = [
  "#00c800", // 연두
  "#2196F3", // 파랑
  "#F44336", // 빨강
  "#FF9800", // 주황
];

const BottomDashboardMainPage = ({ bottomData }) => {
  return (
    <BottomDashboardMainPageMainDivBox>
      {bottomData.map((list) => {
        return (
          <BottomListsContainer
            key={list.type}
            type={list.type}
            data={list.data}
          ></BottomListsContainer>
        );
      })}
    </BottomDashboardMainPageMainDivBox>
  );
};

export default BottomDashboardMainPage;
