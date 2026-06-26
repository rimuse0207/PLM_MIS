import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import BarGraph from "./BarGraph";
import moment from "moment";
import { SegmentLists } from "../../../TopDashboard/TopLists/AverageRatio/AverageRatio";
import MCBarGraph from "./MCBarGraph";
import { IoArrowRedo } from "react-icons/io5";

export const BarsContainerMainDivBox = styled.div`
  height: 100%;
  width: 925px;
  /* min-width: 800px; */
  height: calc(100vh - 395px);
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 10px;
  color: #4d4d4d;
  select {
    height: 40px;
    padding-left: 10px;
    font-weight: 400;
    font-size: 21px;
  }
  .GraphsContainersCount {
    position: relative;
    height: calc(100vh - 425px);
    .LegendContainer {
      position: absolute;

      width: 100%;
      left: 20px;
      z-index: 10;

      .LegendBox {
        display: flex;
        flex-wrap: wrap;
        margin-right: 30px;
        .LegendColors {
          width: 70px;
          /* background-color: #0000ff; */
          height: 25px;
          margin-right: 10px;
          text-align: center;
          line-height: 25px;
          font-weight: bolder;
        }
        .LegendText {
          display: inline-block;
          font-weight: 600;
          text-align: start;
          font-size: 15px;
        }
      }
    }
  }

  .SegmentClickButtonContainer {
    display: flex;
    justify-content: space-between;
    select {
      margin-right: 10px;
      border: 2px solid lightgray;
      border-radius: 10px;
      color: #4d4d4d;
    }
    span {
      font-size: 21px;
      font-weight: 400;
    }
    .IconsBox {
      width: 60px;
      height: 30px;
      background-color: lightgray;
      border-radius: 5px;
      text-align: center;
      font-size: 30px;
      &:hover {
        cursor: pointer;
      }
      svg {
        color: white;
      }
    }
  }
  .BarGraphLabels {
    position: absolute;
    bottom: 50px;
    left: 25%;
    ul {
      width: 500px;
      display: flex;
      flex-flow: wrap;
      justify-content: space-around;
      li {
        display: flex;
        flex-flow: wrap;
        align-items: center;
        height: 20px;
        .LabelGraph {
          width: 50px;
          height: 14px;
        }
        .LabelGraphLine {
          width: 50px;
          height: 6px;
          position: relative;
          border-radius: 4px;

          .Circle {
            position: absolute;
            width: 14px;
            height: 14px;
            background-color: #ffffff;
            border: 2px solid black;
            border-radius: 50%;

            top: 50%;
            left: 50%;
            transform: translate(-45%, -50%);
          }
        }
        .LabelText {
          margin-left: 10px;
        }
      }
    }
  }
`;

const AutoSegmentLists = ["all", "CLT", "MBT", "Storage", "Module", "SoC"];
export const ColorPicks = [
  {
    id: "CLT",
    label: "CLT",
    code: "CLT",
    value: 0,
    SumValue: 0,
    color: "#1146af",
  },
  {
    id: "MBT",
    label: "MBT",
    code: "MBT",
    value: 0,
    SumValue: 0,
    color: "#b9e3a6",
  },
  {
    id: "Storage",
    label: "Storage",
    code: "Storage",
    value: 0,
    SumValue: 0,
    color: "#8acaf4",
  },
  {
    id: "DC/Module",
    label: "DC/Module",
    code: "Module",
    value: 0,
    SumValue: 0,
    color: "#f6e7bc ",
  },
  {
    id: "SoC",
    label: "SoC",
    code: "SOC",
    value: 0,
    SumValue: 0,
    color: "#6600cc",
  },
];

const BarsContainer = ({ data, showingIndex }) => {
  const [SelectBarSegment, setSelectBarSegment] = useState(
    AutoSegmentLists[showingIndex],
  );
  const [localIndex, setLocalIndex] = useState(showingIndex);
  const [isPaused, setIsPaused] = useState(false);

  const pauseTimerRef = useRef(null);
  const safetyTimerRef = useRef(null);

  // 1. 부모의 인덱스 추적 (isPaused가 false일 때만 복사)
  useEffect(() => {
    if (!isPaused) {
      setLocalIndex(showingIndex);
    }
  }, [showingIndex, isPaused]);

  // 2. 마우스 진입 시
  const handleMouseEnter = () => {
    setIsPaused(true);

    // 10초 재시작 예약이 있었다면 취소
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    // 5분(300,000ms) 뒤에는 마우스가 있어도 강제로 움직이게 설정
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    safetyTimerRef.current = setTimeout(
      () => {
        setIsPaused(false);
      },
      5 * 60 * 1000,
    ); // 5분
  };

  // 3. 마우스 이탈 시
  const handleMouseLeave = () => {
    // 5분 타이머는 이제 필요 없으니 취소
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);

    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    // 10초 뒤에 다시 부모 리듬에 맞춤
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
      setLocalIndex(showingIndex);
    }, 10000);
  };

  // 컴포넌트 언마운트 시 모든 타이머 청소 (메모리 누수 방지)
  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const currentSegment = AutoSegmentLists[localIndex];

    if (currentSegment === "all") {
      setSelectBarSegment("all");
    } else {
      const dataChecking = data.filter(
        (item) => item.Segment === currentSegment,
      );
      if (dataChecking.length > 0) {
        setSelectBarSegment(currentSegment);
      }
    }
  }, [localIndex, data]);

  const filterSegmentData = (selectData, segements) => {
    return [...selectData]
      .filter((item) => item.EXPC_SEL_PRICE != null)
      .sort(
        (a, b) =>
          moment(b.ProductCreactDate).valueOf() -
          moment(a.ProductCreactDate).valueOf(),
      );
  };

  const SegmentfilteredData = useMemo(() => {
    if (SelectBarSegment === "all") return data;
    return data.filter((item) => item.Segment === SelectBarSegment);
  }, [data, SelectBarSegment]);

  const MakingAverage = (MCData) => {
    if (!MCData.length) return 0;
    return (
      Math.round(
        MCData.reduce((sum, item) => sum + item.MCRate, 0) / MCData.length,
      ) || 0
    );
  };

  const MakingMCGraphData = useMemo(() => {
    return SegmentLists.map((list) => {
      return {
        ...list,
        MCRate: MakingAverage(
          data.filter((item) => item.Segment === list.code),
        ),
      };
    });
  }, [data, SelectBarSegment]);

  return (
    <BarsContainerMainDivBox
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        {SelectBarSegment !== "all" ? (
          <div className="SegmentClickButtonContainer">
            <div>
              <select
                style={{ marginLeft: "20px" }}
                value={SelectBarSegment}
                onChange={(e) => setSelectBarSegment(e.target.value)}
              >
                {/* <option value="all">Total</option> */}
                {SegmentLists.map((list) => {
                  return (
                    <option value={list.code} key={list.code}>
                      {list.label}
                    </option>
                  );
                })}
              </select>

              <span>
                <strong>MC율 </strong>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "10px" }}>(단위: 억원)</span>
              <div
                className="IconsBox"
                onClick={() => {
                  setSelectBarSegment("all");
                }}
              >
                <IoArrowRedo />
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              fontWeight: "800",
              fontSize: "21px",
              marginLeft: "10px",
              marginTop: "10px",
            }}
          >
            설비별 평균 MC율
          </div>
        )}
      </div>
      <div className="GraphsContainersCount">
        {SelectBarSegment === "all" ? (
          <MCBarGraph
            data={MakingMCGraphData.filter((item) => item.MCRate !== 0)}
            setSelectBarSegment={(data) => setSelectBarSegment(data)}
          />
        ) : (
          <Fragment>
            <BarGraph
              data={filterSegmentData(SegmentfilteredData)}
              types={SelectBarSegment}
            ></BarGraph>
            <div className="BarGraphLabels">
              <ul>
                <li>
                  <div
                    className="LabelGraph"
                    style={{
                      background: `${ColorPicks.find((item) => item.code === SelectBarSegment)?.color}`,
                    }}
                  ></div>
                  <div className="LabelText">MC</div>
                </li>
                <li>
                  <div
                    className="LabelGraph"
                    style={{ background: "#efefef" }}
                  ></div>
                  <div className="LabelText">판가</div>
                </li>
                <li>
                  <div
                    className="LabelGraphLine"
                    style={{
                      background:
                        SelectBarSegment === "Module" ? "#1146af" : "#FFBB00",
                    }}
                  >
                    {/* 테두리 색상이나 배경색을 데이터 상태에 맞추고 싶다면 아래처럼 인라인을 활용하세요 */}
                    <div
                      className="Circle"
                      style={{
                        borderColor:
                          SelectBarSegment === "Module" ? "#1146af" : "#FFBB00",
                      }}
                    />
                  </div>
                  <div className="LabelText">MC율</div>
                </li>
              </ul>
            </div>
          </Fragment>
        )}
      </div>
    </BarsContainerMainDivBox>
  );
};

export default BarsContainer;
