import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaAngleDown } from 'react-icons/fa6';

const InfoContainerMainDivBox = styled.div`
    height: 20vh;
    border: 1px solid lightgray;
    box-shadow: -8px 8px 3px -5px lightgray;
    background-color: #fff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    .Select_Line {
        height: 3px;
        background-color: rgb(0, 202, 255);
    }
    .Info_Container {
        display: flex;
        height: 100%;
        .Info_Container_Left {
            width: 60%;
            padding-left: 20px;

            h2 {
                font-size: 3em;
                margin-top: 10px;
            }
        }
        .Info_Container_Right {
            width: 40%;
            font-size: 1.2em;
            font-weight: bolder;
            line-height: 40px;
            height: 100%;

            ul {
                display: flex;
                flex-flow: column;
                height: 100%;
                justify-content: space-around;

                li {
                    list-style: square;
                    width: 100%;
                }
            }
        }
    }

    /* select 요소의 컨테이너에 화살표 추가 */
    .select-container {
        position: relative;
        display: inline-block;
        width: 200px;
        margin-top: 20px;
        .Select_Arrow {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            pointer-events: none;
            font-size: 20px;
            color: rgb(0, 202, 255);
        }
        select {
            width: 200px;
            padding: 10px;
            font-size: 16px;
            border: 2px solid rgb(0, 202, 255);
            border-radius: 5px;
            background-color: white;
            color: #333;
            appearance: none; /* 브라우저 기본 스타일 제거 */
            -webkit-appearance: none;
            -moz-appearance: none;
            background-repeat: no-repeat;
            background-position: right 10px center;
            background-size: 15px;
        }
        /* select 박스가 포커스될 때 스타일 */
        select:focus {
            border-color: #ff5e5e;
            outline: none;
            box-shadow: 0 0 5px rgba(255, 94, 94, 0.5);
        }

        /* 옵션 스타일 */
        option {
            padding: 10px;
        }
    }
`;

const InfoContainer = ({ DepartMentLists, Detail_Department_Lists, Selector_Value, setSelector_Value }) => {
    const { Groups_Code } = useParams();

    // 고객사 별 개수 세기
    const nameCounts = Detail_Department_Lists.filter(item => (Selector_Value === 'ALL' ? item : item.Models === Selector_Value)).reduce(
        (acc, curr) => {
            acc[curr.Custom] = (acc[curr.Custom] || 0) + 1;
            return acc;
        },
        {}
    );

    // 고객사를 개수 기준으로 내림차순 정렬 후 상위 3개 추출
    const topNames = Object.entries(nameCounts)
        .sort((a, b) => b[1] - a[1]) // [name, count] 형태
        .slice(0, 3)
        .map(([name]) => name);

    return (
        <InfoContainerMainDivBox>
            <div className="Select_Line"></div>
            <div className="Info_Container">
                <div className="Info_Container_Left">
                    <h2>{Groups_Code === 'Modules' ? 'DC/Module' : Groups_Code}</h2>
                    <div class="select-container">
                        <select value={Selector_Value} onChange={e => setSelector_Value(e.target.value)}>
                            <option value="ALL">전체</option>
                            {DepartMentLists.filter(item => item.Department_code === Groups_Code).map(lists => {
                                return lists.equipment_Lists.map(list => {
                                    return <option value={list}>{list}</option>;
                                });
                            })}
                        </select>
                        <div className="Select_Arrow">
                            <FaAngleDown />
                        </div>
                    </div>
                </div>
                <div className="Info_Container_Right">
                    <ul>
                        <li>
                            당해 매출액 :{' '}
                            {Detail_Department_Lists.length > 0
                                ? Detail_Department_Lists.filter(item => (Selector_Value === 'ALL' ? item : item.Models === Selector_Value))
                                      .reduce((pre, acc) => pre + acc.Price, 0)
                                      .toLocaleString('ko-kr')
                                : 0}
                            원
                        </li>
                        <li>
                            평균 MC 율 :{' '}
                            {Detail_Department_Lists.length > 0
                                ? Math.ceil(
                                      (Detail_Department_Lists.filter(item =>
                                          Selector_Value === 'ALL' ? item : item.Models === Selector_Value
                                      ).reduce((pre, acc) => pre + acc.All_Price, 0) /
                                          Detail_Department_Lists.filter(item =>
                                              Selector_Value === 'ALL' ? item : item.Models === Selector_Value
                                          ).reduce((pre, acc) => pre + acc.Price, 0)) *
                                          100
                                  )
                                : 0}
                            %
                        </li>
                        <li>
                            <div>
                                주요 거래처 : <span style={{ fontSize: '0.8em', fontWeight: '300' }}>{topNames.join(', ')}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </InfoContainerMainDivBox>
    );
};

export default InfoContainer;
