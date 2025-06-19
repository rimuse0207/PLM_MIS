import React, { useEffect, useState } from 'react';
import InfoContainer from './InfoContainer/InfoContainer';
import BarContainer from './BarContainer/BarContainer';
import { useParams } from 'react-router-dom';

const TopContainer = ({ DepartMentLists, Selector_Value, setSelector_Value, Detail_Department_Lists }) => {
    const [Detail_Bar_Data, setDetail_Bar_Data] = useState([]);
    const { Groups_Code } = useParams();
    useEffect(() => {
        if (Selector_Value === 'ALL') {
            const [Bars_Sort_Data] = DepartMentLists.filter(list => list.Department_code === Groups_Code);
            const sorting_Bar_Data = Bars_Sort_Data.equipment_Lists.map(list => {
                const sortings = Detail_Department_Lists?.filter(item => list === item.Models);

                return {
                    equipments: `${list}`,
                    MC: Math.ceil(sortings.reduce((pre, acc) => pre + acc.All_Price, 0) / 1000000),
                    price: Math.ceil(sortings.reduce((pre, acc) => pre + acc.Price, 0) / 1000000),
                };
            });
            setDetail_Bar_Data(sorting_Bar_Data);
        } else {
            const Sorting_Data = Detail_Department_Lists.filter(item => Selector_Value === item.Models).sort(
                (a, b) => Number(b.Unit_Rank) - Number(a.Unit_Rank)
            );
            const sorting_Bar_Data = Sorting_Data.map(equipments => {
                return {
                    equipments: `${Selector_Value} ${equipments.Unit_Rank}호기`,
                    MC: Math.ceil(equipments.All_Price / 1000000),
                    price: Math.ceil(equipments.Price / 1000000),
                };
            });
            setDetail_Bar_Data(sorting_Bar_Data);
        }
    }, [Selector_Value, Detail_Department_Lists]);

    return (
        <div style={{ height: '100%' }}>
            <InfoContainer
                DepartMentLists={DepartMentLists}
                Detail_Department_Lists={Detail_Department_Lists}
                Selector_Value={Selector_Value}
                setSelector_Value={data => setSelector_Value(data)}
            ></InfoContainer>
            <BarContainer Detail_Bar_Data={Detail_Bar_Data.filter(item => item.MC > 0)}></BarContainer>
        </div>
    );
};

export default TopContainer;
