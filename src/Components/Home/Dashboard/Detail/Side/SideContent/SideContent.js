import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export const SideContentMainDivBox = styled.div`
    padding: 10px;

    .summation_Table {
        margin-top: 20px;
        margin-bottom: 20px;
        table {
            width: 70%;
        }
    }
    .Detail_Table {
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
        }

        th,
        td {
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }

        th {
            background-color: #f2f2f2;
            color: black;
        }
    }
    .Part_Detail_Table {
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
        }

        th,
        td {
            /* border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd; */
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }

        th {
            background-color: #f2f2f2;
            color: black;
        }
    }
`;

const SideContent = ({ Detail_Department_Lists, DepartMentLists, Selector_Value }) => {
    const { Groups_Code } = useParams();
    const [GetSorting_Data, setGetSoring_Data] = useState([]);
    useEffect(() => {
        Sorting_Data();
    }, [Detail_Department_Lists]);
    const Sorting_Data = () => {
        const [Getting_Data] = DepartMentLists.filter(item => item.Department_code === Groups_Code);

        const Sortings = Getting_Data.equipment_Lists.map(list => {
            return {
                eq_name: list,
                counts: Detail_Department_Lists.filter(item => item.Models === list).length,
                sum_price: Detail_Department_Lists.filter(item => item.Models === list).reduce((pre, acc) => pre + acc.Price * acc.QTY, 0),
                Lists: Detail_Department_Lists.filter(item => item.Models === list),
            };
        });
        setGetSoring_Data(Sortings.sort((a, b) => b.counts - a.counts));
    };

    return (
        <SideContentMainDivBox>
            <div>
                <h2>매출내역</h2>
            </div>
            <div className="summation_Table">
                <table>
                    <tbody>
                        {GetSorting_Data.filter(item => item.counts > 0).map((list, j) => {
                            return (
                                <tr key={list.eq_name}>
                                    <td>{j + 1}. </td>
                                    <td>{list.eq_name} </td>
                                    <td>{list.counts}건</td>
                                    <td>{list.sum_price.toLocaleString('ko-kr')} 원</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="Detail_Table">
                <table>
                    <thead>
                        <tr>
                            <th>거래일</th>
                            <th>모델명</th>
                            <th>호기</th>
                            <th>판가</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Detail_Department_Lists.sort((a, b) => b.DVReqDate - a.DVReqDate).map(list => {
                            return (
                                <tr key={list.Unit_Rank}>
                                    <td>{moment(list.DVReqDate).format('M.DD')}</td>
                                    <td>{list.Models}</td>
                                    <td>{list.Unit_Rank}호기</td>
                                    <td>{list.Price.toLocaleString('ko-kr')}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </SideContentMainDivBox>
    );
};

export default SideContent;
