import React, { useEffect } from "react";
import { CompletedOrdersMainDivBox } from "../../../../TopDashboard/TopLists/CompletedOrders/CompletedOrders";
import styled from "styled-components";
import { ColorArray } from "../../../BottomDashboardMainPage";
import { diviceNumber } from "../../../../RenewalMainPage";

const BarListMainDivBox = styled.div`
  width: 100%;
  .TableContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .BackgroundContainer {
    border-radius: 10px;
    margin-bottom: 10px;
    margin-top: 5px;
    .ActualContainer {
      background-color: green;
      height: 10px;
      width: calc(100% - 100px);
      position: relative;
    }
    .RealContainer {
      position: absolute;
      top: 0px;
      left: 0px;
      height: 10px;
      background-color: #efefef;
      .PercentContainer {
        font-size: 12px;
        position: absolute;
        bottom: -20px;
        right: -0px;
      }
    }
    .TextContainer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      width: 100%;
      background-color: none;
      position: absolute;
      top: 0px;
      left: 0px;

      div {
        margin-left: 10px;
        margin-right: 10px;
        font-weight: bolder;
        font-size: 1.2em;
      }
    }
  }
`;

const BarList = ({ list, ColorNumber, BarData = [] }) => {
  console.log(list.code, BarData);

  const ValueReturn = (data) => {
    if (data === 0) {
      return "";
    }
    return data;
  };

  return (
    <BarListMainDivBox>
      <h3>{list.id}</h3>
      <div className="BackgroundContainer">
        <div className="TableContainer">
          <div
            className="ActualContainer"
            style={{
              backgroundColor:
                Math.round(list.value / diviceNumber) === 0
                  ? "#fff"
                  : list.color,
              // width: `${list.value === 0 ? 0 : 100}%`,
            }}
          ></div>
          <div
            style={{ width: "100px", paddingLeft: "20px", fontSize: "14px" }}
          >
            {Math.round(list.value / diviceNumber).toLocaleString("ko-KR")}
          </div>
        </div>
        <div className="TableContainer">
          <div
            className="ActualContainer"
            style={{
              backgroundColor: "#fff",
              // width: `${list.value === 0 ? 0 : 100}%`,
            }}
          >
            <div
              className="RealContainer"
              style={{
                backgroundColor:
                  Math.round(
                    Number(
                      BarData?.reduce(
                        (pre, acc) => pre + acc.Real_Sell_Price,
                        0,
                      ),
                    ) / diviceNumber,
                  ) === 0
                    ? "#fff"
                    : "#efefef",
                width: `${Number((Number(BarData?.reduce((pre, acc) => pre + acc.Real_Sell_Price, 0)) / list.value) * 100).toFixed(0)}%`,
              }}
            >
              {BarData?.reduce((pre, acc) => pre + acc.Real_Sell_Price, 0) ===
              0 ? (
                <></>
              ) : (
                <div className="PercentContainer">
                  {Number(
                    (Number(
                      BarData?.reduce(
                        (pre, acc) => pre + acc.Real_Sell_Price,
                        0,
                      ),
                    ) /
                      list.value) *
                      100,
                  ).toFixed(0)}
                  %
                </div>
              )}
            </div>
          </div>

          <div
            style={{ width: "100px", paddingLeft: "20px", fontSize: "14px" }}
          >
            {Math.round(
              Number(
                BarData?.reduce((pre, acc) => pre + acc.Real_Sell_Price, 0),
              ) / diviceNumber,
            ).toLocaleString("ko-KR")}
          </div>
        </div>
      </div>
    </BarListMainDivBox>
  );
};

export default BarList;
