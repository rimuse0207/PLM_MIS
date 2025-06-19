import React, { useEffect, useState } from 'react';
import { SideContentMainDivBox } from './SideContent';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const SideContentPartListsTable = ({ Detail_Department_Lists, DepartMentLists, Selector_Value }) => {
    const { Groups_Code } = useParams();
    const [GetSorting_Data, setGetSoring_Data] = useState([]);
    useEffect(() => {
        Sorting_Data();
    }, [Detail_Department_Lists]);
    const Sorting_Data = () => {
        const Sorting_Data = Detail_Department_Lists.filter(item => item.Models === Selector_Value);
        setGetSoring_Data(Sorting_Data.sort((a, b) => Number(b.Unit_Rank) - Number(a.Unit_Rank)));
    };

    return (
        <SideContentMainDivBox>
            <div>
                <h2>구성품</h2>
            </div>

            <div className="Part_Detail_Table" style={{ marginTop: '30px' }}>
                <table>
                    <thead>
                        <tr>
                            <th>호기</th>
                            <th>분류</th>
                            <th>수량</th>
                            <th>금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {GetSorting_Data.map(list => {
                            return (
                                <>
                                    <tr>
                                        <td>{list.Unit_Rank}</td>
                                        <td>IC</td>
                                        <td>
                                            {list.Bom_Lists.filter(item => item.PART_NM === 'IC')
                                                .reduce((pre, acc) => pre + acc.QTY, 0)
                                                .toLocaleString('ko-kr')}
                                        </td>
                                        <td style={{ textAlign: 'end' }}>
                                            {list.Bom_Lists.filter(item => item.PART_NM === 'IC')
                                                .reduce((pre, acc) => pre + acc.Purchase_price * acc.QTY, 0)
                                                .toLocaleString('ko-kr')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>레지스터</td>
                                        <td>
                                            {list.Bom_Lists.filter(item => item.PART_NM === 'RESISTOR')
                                                .reduce((pre, acc) => pre + acc.QTY, 0)
                                                .toLocaleString('ko-kr')}
                                        </td>
                                        <td style={{ textAlign: 'end' }}>
                                            {list.Bom_Lists.filter(item => item.PART_NM === 'RESISTOR')
                                                .reduce((pre, acc) => pre + acc.Purchase_price * acc.QTY, 0)
                                                .toLocaleString('ko-kr')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>CAPACITOR</td>
                                        <td>
                                            {list.Bom_Lists.filter(item => item.PART_NM === 'CAPACITOR')
                                                .reduce((pre, acc) => pre + acc.QTY, 0)
                                                .toLocaleString('ko-kr')}
                                        </td>
                                        <td style={{ textAlign: 'end' }}>
                                            {list.Bom_Lists.filter(item => item.PART_NM === 'CAPACITOR')
                                                .reduce((pre, acc) => pre + acc.Purchase_price * acc.QTY, 0)
                                                .toLocaleString('ko-kr')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>기타</td>
                                        <td>
                                            {list.Bom_Lists.filter(
                                                item => item.PART_NM !== 'CAPACITOR' && item.PART_NM !== 'RESISTOR' && item.PART_NM !== 'IC'
                                            )
                                                .reduce((pre, acc) => pre + acc.QTY, 0)
                                                .toLocaleString('ko-kr')}
                                        </td>
                                        <td style={{ textAlign: 'end' }}>
                                            {list.Bom_Lists.filter(
                                                item => item.PART_NM !== 'CAPACITOR' && item.PART_NM !== 'RESISTOR' && item.PART_NM !== 'IC'
                                            )
                                                .reduce((pre, acc) => pre + acc.Purchase_price * acc.QTY, 0)
                                                .toLocaleString('ko-kr')}
                                        </td>
                                    </tr>
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </SideContentMainDivBox>
    );
};

export default SideContentPartListsTable;
