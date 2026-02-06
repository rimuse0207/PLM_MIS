import React from "react";
import styled from "styled-components";

const SideNavigationMainDivBox = styled.div`
  border: 1px solid lightgray;
  background-color: #fff;
  height: 100%;
  li {
    &:hover {
      cursor: pointer;
      background-color: #efefef;
      color: blue;
    }
  }
`;

const SideNavigation = () => {
  return (
    <SideNavigationMainDivBox>
      <ul>
        <li onClick={() => window.open("/ERP/Stock/Part")}>Inventory</li>
        {/* <li>A</li>
        <li>B</li> */}
      </ul>
    </SideNavigationMainDivBox>
  );
};

export default SideNavigation;
