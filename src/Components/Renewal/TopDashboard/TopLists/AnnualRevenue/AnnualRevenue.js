import React, { useMemo } from "react";
import styled from "styled-components";
import { diviceNumber } from "../../../RenewalMainPage";
import { useSelector } from "react-redux";
import { AnimatedItemBox } from "../CompletedOrders/CompletedOrders";
export const AnnualRevenueMainDivBox = styled.div`
  height: 100%;
  padding: 0 10px;
  position: relative;
  color: #4d4d4d;
  .MainContainer {
    display: flex;
    flex-flow: wrap;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
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
      font-weight: 900;
      font-size: 21px;
    }
  }
  .MainContent {
    width: 100%;
    text-align: center;
    font-size: 40px;

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
  .FloatContainer {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    .LeftContainer {
      width: 50%;
      border-right: 1px solid #4d4d4d;
    }
    .RightContainer {
      width: 50%;
    }
    .bottomBoard {
      margin-top: 10px;
    }
  }
  .TableContentBox {
    width: 100%;
    flex: 1; /* 💡 중요: 전체 높이 중 Title을 제외한 '남은 높이 전체'를 차지하게 합니다. */
    overflow-y: auto; /* 💡 내용이 넘칠 때 여기에 세로 스크롤이 생깁니다. */
    box-sizing: border-box;
    /* ❌ 기존의 height: 100%와 padding-top: 50px는 삭제합니다! */

    .TableContainer {
      width: 100%;
      font-size: 13px;
      table-layout: fixed;
      border-collapse: collapse;

      thead {
        text-align: center;
        border-bottom: 1px solid lightgray;
        /* 💡 스크롤 시 테이블 헤더를 상단에 고정하고 싶다면 추가 */
        position: sticky;
        top: 0;
        background-color: #fff;
        z-index: 1;
      }

      tbody {
        text-align: center;
        tr {
          border-bottom: 1px solid lightgray;
          td {
            padding-top: 5px;
            padding-bottom: 5px;
          }
        }
      }
    }
  }
`;

const AnnualRevenue = ({
  data,
  subTitle,
  autoShowing = [],
  showingIndex,
  subTopData = [],
}) => {
  const SelectDate = useSelector(
    (state) => state.Select_Date_Reducer_State.Select_Date_State,
  );

  const safeIndex = Math.min(showingIndex, autoShowing.length - 1);
  const currentItem = autoShowing[safeIndex];

  const MakingAverage = (MCData) => {
    if (!MCData.length) return 0;
    return (
      Math.round(
        MCData.reduce((sum, item) => sum + item.MCRate, 0) / MCData.length,
      ) || 0
    );
  };

  // const filteredData = useMemo(() => {
  //   const make = () => {
  //     if (ChooseSelect === "all") return subTopData ?? [];
  //     return subTopData.filter((item) => item.Segment === ChooseSelect) ?? [];
  //   };

  //   return make();
  // }, [subTopData, ChooseSelect]);

  const DataChecking = (selectData) => {
    if (SelectDate?.value === "2024") {
      return Math.round(4120000000 / diviceNumber).toLocaleString("ko-KR");
    } else if (SelectDate?.value === "2025") {
      return Math.round(58321369823 / diviceNumber).toLocaleString("ko-KR");
    } else if (selectData[0]) {
      return Math.round(
        selectData[0]?.sumSupplyPrice / diviceNumber,
      ).toLocaleString("ko-KR");
    } else {
      return 0;
    }
  };
  return (
    <AnnualRevenueMainDivBox>
      <div className="MainContainer">
        <div className="Title krSuc">
          <h4>
            실적 <strong style={{ fontWeight: "normal" }}>(매출 | MC율)</strong>
          </h4>
        </div>
        <div className="FloatContainer">
          <div className="LeftContainer">
            <div className="MainContent">
              <h2>
                {DataChecking(data)}
                <span style={{ fontSize: "40px" }}>{subTitle}</span>
              </h2>
            </div>
            <div className="bottomBoard">
              {currentItem && (
                <AnimatedItemBox key={showingIndex}>
                  <span className="index-num">{safeIndex + 1}</span>
                  {currentItem?.Segment}
                  {" #"}
                  {currentItem?.CHNG_CONT?.split("#")[1]?.split("호기")[0]}
                  {"_"}
                  <strong>
                    {Number(currentItem?.EXPC_SEL_PRICE / diviceNumber).toFixed(
                      0,
                    )}
                  </strong>
                  <span className="unit">억원</span>
                </AnimatedItemBox>
              )}
            </div>
          </div>
          <div className="RightContainer">
            <div className="MainContent">
              <h2>
                {MakingAverage(subTopData)}
                <span style={{ fontSize: "40px" }}>%</span>
              </h2>
            </div>
            <div className="bottomBoard">
              {currentItem && (
                <AnimatedItemBox key={showingIndex}>
                  <strong>{Number(currentItem.MCRate).toFixed(0)}</strong>
                  <span className="unit">%</span>
                </AnimatedItemBox>
              )}
            </div>
          </div>
        </div>
      </div>
    </AnnualRevenueMainDivBox>
  );
};
export default AnnualRevenue;
