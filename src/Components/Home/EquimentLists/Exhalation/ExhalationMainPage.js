import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EquipmentExhalationContainer from './EquipmentExhalationContainer/EquipmentExhalationContainer';
import { EquimentListsMainPageMainDivBox } from '../EquimentListsMainPage';
import NavigationMainPage from '../../../Navigation/NavigationMainPage';
import Loader from '../../../../Loader/Loader';
import Charts from './Charts/Charts';
import { Request_Get_Axios } from '../../../../API';

const ExhalationMainPage = () => {
    const { Model_Name } = useParams();
    const [Equipment_Exhalation_Lists, setEquipment_Exhalation_Lists] = useState([]);
    const [Select_Model_Name, setSelect_Model_Name] = useState('');
    const [MC_Graph_Data, setMC_Graph_Data] = useState([]);
    const [MC_Rate_Graph_Data, setMC_Rate_Graph_Data] = useState([]);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        HandleClickDetailEquipmentInfo();
    }, [Model_Name]);

    const HandleClickDetailEquipmentInfo = async () => {
        setLoading(true);
        setSelect_Model_Name(Model_Name);
        const HandleClickDetailEquipmentInfo_Axios = await Request_Get_Axios(
            '/PLM_Route/PLM_Dashboard/Getting_Detail_Equiment_Models_Lists',
            {
                Models_Name: Model_Name,
            }
        );
        if (HandleClickDetailEquipmentInfo_Axios.status) {
            console.log(HandleClickDetailEquipmentInfo_Axios);
            setEquipment_Exhalation_Lists(HandleClickDetailEquipmentInfo_Axios.data.Add_BOM_Lists_EQ_NO);
            setMC_Graph_Data([
                { id: '판가', data: HandleClickDetailEquipmentInfo_Axios.data.Sell_Price_Graph_Data },
                { id: 'MC', data: HandleClickDetailEquipmentInfo_Axios.data.MC_Graph_Data },
            ]);
            setMC_Rate_Graph_Data([{ id: 'MC율', data: HandleClickDetailEquipmentInfo_Axios.data.MC_Rate_Graph_Data }]);
        }
        setLoading(false);
    };

    return (
        <EquimentListsMainPageMainDivBox>
            <NavigationMainPage></NavigationMainPage>
            <h1>{Model_Name}</h1>
            {/* 그래프 */}
            {MC_Rate_Graph_Data.length > 0 && MC_Graph_Data.length > 0 ? (
                <div className="Graph_Cotainer">
                    <div className="Graph_Left_Cotainer">
                        <div style={{ textAlign: 'center' }}>
                            <h2>MC율</h2>
                        </div>
                        <div>
                            <Charts Model_Name={Select_Model_Name} Graph_Data={MC_Rate_Graph_Data} Rate_Check={true}></Charts>
                        </div>
                    </div>
                    <div className="Graph_Right_Cotainer">
                        <div style={{ textAlign: 'center' }}>
                            <h2>MC 및 단가</h2>
                        </div>
                        <div>
                            <Charts Model_Name={Select_Model_Name} Graph_Data={MC_Graph_Data} Rate_Check={false}></Charts>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}

            <div>
                <ul className="Equiment_Lists_Container">
                    {Equipment_Exhalation_Lists.map(list => {
                        return (
                            <li key={list.WO_NO}>
                                <EquipmentExhalationContainer list={list}></EquipmentExhalationContainer>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <Loader loading={Loading}></Loader>
        </EquimentListsMainPageMainDivBox>
    );
};

export default ExhalationMainPage;
