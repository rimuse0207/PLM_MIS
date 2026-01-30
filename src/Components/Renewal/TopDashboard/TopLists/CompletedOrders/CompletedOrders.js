import React from "react";
import { AnnualRevenueMainDivBox } from "../AnnualRevenue/AnnualRevenue";
import styled from "styled-components";

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

const CompletedOrders = ({ data }) => {
  return (
    <AnnualRevenueMainDivBox>
      <div className="MainContainer">
        <div className="Title">
          <h4>Work Orders CNT</h4>
        </div>
        <div className="MainContent">
          <div className="WorkOrderContainer">
            <table>
              <tbody>
                <tr>
                  <td style={{ paddingLeft: "15px" }}>EQP</td>
                  <td style={{ paddingLeft: "10px" }}>
                    {data?.equipmentCount?.length}
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "15px" }}>BRD</td>
                  <td style={{ paddingLeft: "10px" }}>
                    {data?.boardCount?.length}
                  </td>
                </tr>
              </tbody>
            </table>
            <h2>{data?.equipmentCount?.length + data?.boardCount?.length}</h2>
          </div>
        </div>
      </div>
    </AnnualRevenueMainDivBox>
  );
};
export default CompletedOrders;
