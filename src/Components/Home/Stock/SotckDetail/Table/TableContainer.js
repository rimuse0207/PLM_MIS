import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getMonthsOfYearUntilNow, numberToKorean } from '../../CommonFunc/CommonFunc';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { IoSearchOutline } from 'react-icons/io5';
const TableContainerMainDivBox = styled.div`
    width: 100%;

    table {
        border-collapse: collapse;
        font-size: 13px;
        table-layout: fixed;
        width: 100%;
    }

    thead {
        background-color: #f2f2f2;
        position: sticky;
        top: 0;
        z-index: 1;
        border-bottom: 3px solid rgb(0, 202, 255);
    }

    th,
    td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
        word-break: break-word;
    }

    th {
        background-color: #f2f2f2;
        color: black;
        /* cursor: pointer; */
    }
    .Hover_Setting {
        &:hover {
            cursor: pointer;
        }
    }
    .tbody-container {
        display: block;
        max-height: calc(100vh - 130px);
        overflow-y: auto;
        width: 100%;
        overflow-y: scroll;
        scrollbar-gutter: stable;
    }

    .tbody-container table {
        table-layout: fixed;
    }
    .Search_Cotainers {
        display: flex;
        margin-top: 10px;
        margin-bottom: 10px;
        justify-content: end;
        margin-right: 20px;
        .Search_Title {
            background-color: lightgray;
            padding-left: 20px;
            padding-right: 20px;
            border-radius: 5px;
            line-height: 30px;
        }
        .Search_Input_Container {
            position: relative;
            input {
                border: 1px solid lightgray;
                height: 30px;
                width: 200px;
                padding-left: 10px;
                &:focus {
                    outline: 1px solid rgb(0, 202, 255);
                    border: 1px solid rgb(0, 202, 255);
                }
            }
            label {
                position: absolute;
                right: 15px;
                top: 6px;
                &:hover {
                    cursor: pointer;
                    color: red;
                }
            }
        }
        .Icons {
            border: 1px solid lightgray;
            background-color: #fff;
            height: 30px;
            line-height: 35px;
            padding-left: 10px;
            padding-right: 10px;
            &:hover {
                cursor: pointer;
            }
        }
    }
`;

const TableContainer = ({ Table_Select_List_State }) => {
    const Select_Date_State = useSelector(state => state.Select_Date_Reducer_State.Select_Date_State);
    const [MonthLists, setMonthLists] = useState([]);
    const [sortedList, setSortedList] = useState(Table_Select_List_State);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [Search_Name, setSearch_Name] = useState('');
    useEffect(() => {
        setSortedList(Table_Select_List_State);
    }, [Table_Select_List_State]);
    useEffect(() => {
        Getting_Months();
    }, [Select_Date_State.value]);
    const Getting_Months = async () => {
        const Months = await getMonthsOfYearUntilNow(Select_Date_State.value);

        setMonthLists(Months);
    };
    const handleSort = key => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = null;
        }

        const sorted = [...Table_Select_List_State];
        if (direction === 'asc') {
            sorted.sort((a, b) => a[key]?.localeCompare?.(b[key]) ?? a[key] - b[key]);
        } else if (direction === 'desc') {
            sorted.sort((a, b) => b[key]?.localeCompare?.(a[key]) ?? b[key] - a[key]);
        }

        setSortConfig({ key, direction });
        setSortedList(direction ? sorted : Table_Select_List_State); // 원래대로
    };
    return (
        <TableContainerMainDivBox>
            <div className="Search_Cotainers">
                <div className="Search_Title">구매처명</div>
                <div className="Search_Input_Container">
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                        }}
                    >
                        <input value={Search_Name} onChange={e => setSearch_Name(e.target.value)}></input>
                        <label onClick={() => setSearch_Name('')}>X</label>
                    </form>
                </div>
                <span className="Icons">
                    <IoSearchOutline />
                </span>
            </div>
            <div className="tbody-container">
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '50px' }}>No.</th>
                            <th className="Hover_Setting" onClick={() => handleSort('ItemSName')} style={{ userSelect: 'none' }}>
                                구매처명
                                {sortConfig.key === 'ItemSName'
                                    ? sortConfig.direction === 'asc'
                                        ? ' ▲'
                                        : sortConfig.direction === 'desc'
                                        ? ' ▼'
                                        : null
                                    : null}
                            </th>
                            <th className="Hover_Setting" onClick={() => handleSort('Price')} style={{ userSelect: 'none' }}>
                                연 누적액
                                {sortConfig.key === 'Price'
                                    ? sortConfig.direction === 'asc'
                                        ? ' ▲'
                                        : sortConfig.direction === 'desc'
                                        ? ' ▼'
                                        : null
                                    : null}
                            </th>
                            {MonthLists.map(list => (
                                <th key={list}>{moment(list).format('MM월')}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedList
                            .filter(Searching => Searching.ItemSName.toLowerCase().includes(Search_Name.toLowerCase()))
                            .map((list, j) => (
                                <tr key={list.ItemSName}>
                                    <td>{j + 1}</td>
                                    <td>{list.ItemSName}</td>
                                    <td style={{ textAlign: 'end' }}>
                                        {numberToKorean(list.Price) ? `${numberToKorean(list.Price)} 원` : ''}
                                    </td>
                                    {list?.lists.map((item, i) => (
                                        <td style={{ textAlign: 'end' }} key={i}>
                                            {numberToKorean(item.Price) ? `${numberToKorean(item.Price)} 원` : ' '}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </TableContainerMainDivBox>
    );
};

export default TableContainer;
