import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import BarGraph from "./BarGraph";
import moment from "moment";
import { SegmentLists } from "../../../TopDashboard/TopLists/AverageRatio/AverageRatio";
import MCBarGraph from "./MCBarGraph";
import { IoArrowRedo } from "react-icons/io5";

export const BarsContainerMainDivBox = styled.div`
  height: 100%;
  width: 840px;
  /* min-width: 800px; */
  height: calc(100vh - 450px);
  background-color: #fff;
  border-radius: 10px;

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
`;

const AutoSegmentLists = ["all", "CLT", "MBT", "Storage", "Module", "SoC"];

const BarsContainer = ({ data, showingIndex }) => {
  const [SelectBarSegment, setSelectBarSegment] = useState(
    AutoSegmentLists[showingIndex],
  );
  const [localIndex, setLocalIndex] = useState(showingIndex);
  const [isPaused, setIsPaused] = useState(false);

  const pauseTimerRef = useRef(null); // 10초 대기용
  const safetyTimerRef = useRef(null); // 5분 강제 재개용 (추가)

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

    // [추가] 5분(300,000ms) 뒤에는 마우스가 있어도 강제로 움직이게 설정
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    safetyTimerRef.current = setTimeout(
      () => {
        setIsPaused(false);
        console.log("5분이 지나 자동 재생을 강제 재개합니다.");
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
              <span>MC율</span>
            </div>
            <div
              className="IconsBox"
              onClick={() => {
                setSelectBarSegment("all");
              }}
            >
              <IoArrowRedo />
            </div>
          </div>
        ) : (
          <div
            style={{
              fontWeight: "400",
              fontSize: "21px",
              marginLeft: "10px",
              marginTop: "10px",
            }}
          >
            설비별 평균 MC율
          </div>
        )}
      </div>
      <div style={{ height: "100%" }} className="GraphsContainersCount">
        {SelectBarSegment === "all" ? (
          <MCBarGraph
            data={MakingMCGraphData}
            setSelectBarSegment={(data) => setSelectBarSegment(data)}
          />
        ) : (
          <Fragment>
            <BarGraph data={filterSegmentData(SegmentfilteredData)}></BarGraph>
            <div>
              <ul
                className="LegendContainer"
                style={{
                  bottom:
                    filterSegmentData(SegmentfilteredData).length > 6
                      ? "80px"
                      : "72px",
                }}
              >
                <li>
                  <div className="LegendBox">
                    <div
                      className="LegendColors"
                      style={{ backgroundColor: "#ddddff" }}
                    >
                      판가
                    </div>
                    {/* <div className="LegendText">Price</div> */}
                  </div>
                </li>
                <li>
                  <div className="LegendBox">
                    <div
                      className="LegendColors"
                      style={{
                        backgroundColor: "#0000ff",
                        color: "#fff",
                        marginTop: "2px",
                      }}
                    >
                      MC
                    </div>
                    {/* <div className="LegendText">MC</div> */}
                  </div>
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
