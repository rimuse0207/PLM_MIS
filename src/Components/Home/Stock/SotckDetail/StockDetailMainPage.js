import React, { useEffect, useState } from 'react';
import TopNavigationMainPage from '../../../Navigation/TopNavigation/TopNavigationMainPage';
import TableContainer from './Table/TableContainer';
import { useSelector } from 'react-redux';
import { API_Request_Get_Axios, API_Request_Post_Axios, Request_Get_Axios } from '../../../../API';
import { getMonthsOfYearUntilNow } from '../CommonFunc/CommonFunc';
import Loader from '../../../../Loader/Loader';

const StockDetailMainPage = () => {
    const Select_Date_State = useSelector(state => state.Select_Date_Reducer_State.Select_Date_State);
    const [Table_Select_List_State, setTable_Select_List_State] = useState([]);

    const [Loading, setLoading] = useState(false);
    useEffect(() => {
        Get_Stock_Maker_Company_Lists_From_Exicon_ERP_Stock_Func();
    }, [Select_Date_State]);

    const Get_Stock_Maker_Company_Lists_From_Exicon_ERP_Stock_Func = async () => {
        setLoading(true);
        const Months = await getMonthsOfYearUntilNow(Select_Date_State.value);
        const Get_Stock_Maker_Company_Lists_From_Exicon_ERP_Stock_Axios = await API_Request_Post_Axios(
            '/ERPStock/Get_Stock_Maker_Company_Lists_From_Exicon_ERP_Stock',
            {
                Months,
            }
        );
        if (Get_Stock_Maker_Company_Lists_From_Exicon_ERP_Stock_Axios.status) {
            if (Get_Stock_Maker_Company_Lists_From_Exicon_ERP_Stock_Axios.data.length > 0) {
                const change_data = {
                    dates: Get_Stock_Maker_Company_Lists_From_Exicon_ERP_Stock_Axios.data[
                        Get_Stock_Maker_Company_Lists_From_Exicon_ERP_Stock_Axios.data.length - 1
                    ].dates,
                    company_lists: Get_Stock_Maker_Company_Lists_From_Exicon_ERP_Stock_Axios.data[
                        Get_Stock_Maker_Company_Lists_From_Exicon_ERP_Stock_Axios.data.length - 1
                    ].company_lists.map(company => {
                        const matchedLists = Get_Stock_Maker_Company_Lists_From_Exicon_ERP_Stock_Axios.data.map(item => {
                            const match = item.company_lists.find(c => c.ItemSName === company.ItemSName);

                            return {
                                dates: item.dates,
                                Price: match ? match.Price : 0, // ❗ 없는 경우 Price = 0,
                            };
                        });

                        return {
                            ...company,
                            lists: matchedLists,
                        };
                    }),
                };
                setTable_Select_List_State(change_data.company_lists);
            }
        }
        setLoading(false);
    };

    return (
        <div>
            <TopNavigationMainPage></TopNavigationMainPage>
            <div>
                <TableContainer Table_Select_List_State={Table_Select_List_State}></TableContainer>
            </div>
            <Loader loading={Loading}></Loader>
        </div>
    );
};

export default StockDetailMainPage;
