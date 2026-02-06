import React from "react";
import styled from "styled-components";
import { diviceNumber } from "../../../RenewalMainPage";
export const AnnualRevenueMainDivBox = styled.div`
  height: 100%;
  padding: 0 10px;
  position: relative;
  .MainContainer {
    display: flex;
    flex-flow: wrap;
    align-items: center;
    justify-content: center;
    height: 100%;

    .krSuc {
      display: flex;
      justify-content: space-between;
      width: 90%;
    }
  }

  .Title {
    width: 100%;

    align-items: center;
    position: absolute;
    top: 10px;
    left: 15px;

    select {
      margin-right: 15px;
      width: 120px;
      height: 30px;
      margin-left: 15px;
      /* font-weight: bold; */
      font-size: 21px;
    }
    h4 {
      font-weight: 500;
      font-size: 21px;
    }
  }
  .MainContent {
    width: 100%;
    text-align: center;
    font-size: 40px;
    margin: 0px 10px;
    position: relative;
    margin-top: 20px;

    .IconContainer {
      position: absolute;
      top: 3px;
      left: 10px;
    }

    .UPDownData {
      font-size: 15px;

      position: absolute;
      top: 50%;
      right: 0px;
      transform: translate(0%, -50%);

      width: 80px;
      height: 25px;
      line-height: 25px;
      font-weight: bolder;
      span {
        padding-left: 20px;
      }
      svg {
        font-size: 1em;
        margin-right: 10px;
      }
    }
    .Up {
      background-color: #e5efff;
      color: blue;
    }
    .Down {
      background-color: #f443;
      color: red;
      svg {
        transform: rotate(180deg);
      }
    }
    .RateDown {
      background-color: #e5efff;
      color: blue;
      svg {
        transform: rotate(180deg);
      }
    }
    .RateUp {
      background-color: #f443;
      color: red;
    }
  }
  .subContent {
    width: 100%;
    font-weight: bolder;
    text-align: center;
    .colorChangeContent {
      font-size: 18px;
    }
  }
  .WorkOrderContainer {
    display: flex;
    flex-flow: wrap;
    justify-content: space-evenly;
    line-height: 60px;
    table {
      border: 0;
      width: 20%;
      border-collapse: collapse;
      padding: 0px;
      line-height: 10px;
      tbody {
        tr {
          border-left: 3px solid lightgray;
          height: 10px;
          td {
            font-size: 15px;
            height: 10px;
            line-height: 10px;
            padding: 0;
            font-weight: bolder;
            /* text-align: center; */
          }
        }
      }
    }
  }
`;

const AnnualRevenue = ({ data }) => {
  return (
    <AnnualRevenueMainDivBox>
      <div className="MainContainer">
        <div className="Title krSuc">
          <h4>Annual Revenue</h4>
          <div>(KRW Million)</div>
        </div>
        <div className="MainContent">
          <h2>
            {data[0]
              ? Math.round(
                  data[0].sumSupplyPrice / diviceNumber,
                ).toLocaleString("ko-KR")
              : 0}
          </h2>
        </div>
      </div>
    </AnnualRevenueMainDivBox>
  );
};
export default AnnualRevenue;
