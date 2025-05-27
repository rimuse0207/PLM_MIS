import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import ExcelDownload from './ExcelDownload/ExcelDownload';
import { useParams } from 'react-router-dom';
import { MdInfo } from 'react-icons/md';
import ShowModal from './ShowModal/ShowModal';

const EquipmentExhalationContainer = ({ list, HandleClickDetailEquipmentInfo }) => {
    const { Model_Name } = useParams();
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    return (
        <div className="Lists_Containers_For_Equipment">
            <div className="Title_Container">
                <div className="Title_Left_Container">
                    <h2>{list.MODEL}</h2>
                    <div style={{ fontSize: '14px' }}>( {list.FSC_CD} )</div>
                </div>
                <div className="Title_Right_Container">
                    <div>{list.source === 'SBMS' ? `${list.EQNO_BY_MODEL} 호기` : 'PLM'}</div>
                    <div>{list.CUSTOMER}</div>
                </div>
            </div>
            <div className="Calculate_Container">
                <div className="Calculate_Right_Container">
                    <div>
                        <div className="Price_Showing_Title">M C</div>
                        <div className="Price_Showing_Description">{Math.ceil(list.All_Price).toLocaleString('ko-KR')} 원</div>
                    </div>
                    <div>
                        <div className="Price_Showing_Title">판가</div>
                        <div className="Price_Showing_Description">{Math.ceil(list.Sell_Price).toLocaleString('ko-KR')} 원</div>
                    </div>
                </div>
                <div className="Calculate_Left_Container">
                    <div>
                        MC율 : <span>{Math.ceil(list.MC)} %</span>
                    </div>
                    <div style={{ height: '150px', textAlign: 'center', overflow: 'hidden' }}>
                        <div
                            style={{
                                width: '100%',
                                height: `${100 - Math.ceil(list.MC)}%`,
                                border: '1px solid lightgray',
                                BorderRadiusTopright: '5px',
                                BorderRadiusTopleft: '5px',
                            }}
                        ></div>
                        <div
                            style={{
                                width: '100%',
                                height: `${Math.ceil(list.MC)}%`,
                                background: 'orange',
                                BorderRadiusBottomleft: '5px',
                                BorderRadiusBottomRight: '5px',
                            }}
                        ></div>
                    </div>
                </div>
            </div>
            {/* {Model_Name ? (
                <div className="Info_Container" onClick={() => setModalIsOpen(true)}>
                    <MdInfo />
                </div>
            ) : (
                <></>
            )} */}
            <div className="Info_Container" onClick={() => setModalIsOpen(true)}>
                <MdInfo />
            </div>
            {ModalIsOpen ? (
                <ShowModal
                    onMessage={'원하시는 처리를 클릭 해 주세요.'}
                    onSubMessage={'원하시는 처리를 클릭 해 주세요.'}
                    onClose={() => setModalIsOpen(false)}
                    Select_Data={list}
                    HandleClickDetailEquipmentInfo={() => HandleClickDetailEquipmentInfo()}
                ></ShowModal>
            ) : (
                <></>
            )}
        </div>
    );
};
export default EquipmentExhalationContainer;
