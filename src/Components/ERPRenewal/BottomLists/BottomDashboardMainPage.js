import React from "react";
import { BottomDashboardMainPageMainDivBox } from "../../Renewal/BottomDashboard/BottomDashboardMainPage";
import BottomList from "./BottomList";

import BottomSubList from "./BottomSubList";

const BottomDashboardMainPage = () => {
  return (
    <BottomDashboardMainPageMainDivBox>
      <BottomList></BottomList>
      <BottomSubList></BottomSubList>
      <BottomSubList></BottomSubList>
    </BottomDashboardMainPageMainDivBox>
  );
};
export default BottomDashboardMainPage;
