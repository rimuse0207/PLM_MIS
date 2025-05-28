import React, { useState } from 'react';
import styled from 'styled-components';
import ExcelDownload from '../ExcelDownload/ExcelDownload';
import { CgArrowsExchangeV } from 'react-icons/cg';
import { Request_Post_Axios } from '../../../../../../API';
import { toast } from '../../../../../ToastMessage/ToastManager';
import { useDispatch } from 'react-redux';
import { AllEquipmentsfetchData } from '../../../../../../Models/ReduxThunks/AllEquipmentsReducers/AllEquipmentsReducers';
import { Navigate, useNavigate } from 'react-router-dom';

const Modal = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease-in-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .Input_For_Price_Container {
        border: 1px solid lightgray;
        display: flex;
        margin-bottom: 30px;
        .Input_Left_Container {
            width: 30%;
            background-color: #efefef;
        }
        .Input_Right_Container {
            width: 70%;
            text-align: end;
        }
        .Price_Input_Container {
            input {
                width: 100%;
                border: none;
                height: 30px;
                text-align: end;
                padding-right: 10px;
                font-size: 16px;
            }
        }
    }
`;

const Message = styled.p`
    font-size: 20px;
    margin-bottom: 20px;
`;
const CancelButton = styled.button`
    background: #ddd;
    color: black;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    flex: 1;
    width: 150px;
    height: 80px;
    margin-right: 10px;
    margin-bottom: 10px;
    &:hover {
        background: #bbb;
    }
`;

const OnReturnButton = styled.div`
    background-color: ${props => (props.BackColors ? props.BackColors : 'lightgray')};
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    flex: 1;
    margin-right: 10px;
    width: 150px;
    height: 80px;
    margin-bottom: 10px;
    display: inline-block;
    div {
        height: 100%;
        line-height: 60px;
    }
    &:hover {
        background: ${props => (props.hoverBackColors ? props.hoverBackColors : 'gray')};
    }
`;
const ButtonContainer = styled.div`
    /* display: flex;
    justify-content: space-between; */
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ShowModal = ({ onMessage, onSubMessage, onClose, Select_Data, HandleClickDetailEquipmentInfo }) => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const [Change_SellPrice_Modal, setChange_SellPrice_Modal] = useState(false);
    const [Change_Sell_Price_State, setChange_Sell_Price_State] = useState(Select_Data.Sell_Price);

    /// 숫자를 한글로 표시 해 주기
    function numberToKorean(number) {
        var inputNumber = number < 0 ? false : number;
        var unitWords = ['', '만', '억', '조', '경'];
        var splitUnit = 10000;
        var splitCount = unitWords.length;
        var resultArray = [];
        var resultString = '';

        for (var i = 0; i < splitCount; i++) {
            var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
            unitResult = Math.floor(unitResult);
            if (unitResult > 0) {
                resultArray[i] = unitResult;
            }
        }

        for (var i = 0; i < resultArray.length; i++) {
            if (!resultArray[i]) continue;
            resultString = String(numberFormat(resultArray[i])) + ' ' + unitWords[i] + ' ' + resultString;
        }

        return resultString;
    }

    /// 3자리 마다 , 넣기
    function numberFormat(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // 판가 금액 변경 전송
    const Change_Sell_Price_Data = async () => {
        try {
            const Send_Data_For_Change_The_Sell_Price_Axios = await Request_Post_Axios(
                '/PLM_Route/PLM_Dashboard/Send_Data_For_Change_The_Sell_Price',
                {
                    Select_Data: {
                        MODEL: Select_Data.MODEL,
                        FSC_CD: Select_Data.FSC_CD,
                        EQ_NO: Select_Data.source === 'PLM' ? Select_Data.FSC_CD : Select_Data.EQ_NO,
                        WO_NO: Select_Data.source === 'PLM' ? Select_Data.FSC_CD : Select_Data.WO_NO,
                        EQNO_BY_MODEL: Select_Data.source === 'PLM' ? 1 : Select_Data.EQNO_BY_MODEL,
                    },
                    Change_Sell_Price_State,
                }
            );
            if (Send_Data_For_Change_The_Sell_Price_Axios.status) {
                onClose();
                toast.show({
                    title: `판가 변경이 완료되었습니다.`,
                    successCheck: true,
                    duration: 6000,
                });
                if (Select_Data.source === 'PLM') {
                    dispatch(AllEquipmentsfetchData());
                } else {
                    await HandleClickDetailEquipmentInfo();
                }
            } else {
                toast.show({
                    title: `오류가 발생되었습니다. IT팀에 문의바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Overlay>
            {Change_SellPrice_Modal ? (
                <Modal>
                    <Message>판가 금액 변경</Message>
                    <div style={{ textAlign: 'start', fontWeight: 'bolder', marginBottom: '10px' }}>기존 등록 된 금액 </div>
                    <div className="Input_For_Price_Container">
                        <div className="Input_Left_Container">
                            <div>대한민국</div>
                            <div>KRW</div>
                        </div>
                        <div className="Input_Right_Container">
                            <div style={{ paddingRight: '10px' }}>{Select_Data.Sell_Price} </div>
                            <div style={{ fontSize: '13px', color: 'gray' }}>{numberToKorean(Select_Data.Sell_Price)} 원</div>
                        </div>
                    </div>
                    <div style={{ fontSize: '3em', color: 'gray' }}>
                        <CgArrowsExchangeV />
                    </div>
                    <div style={{ textAlign: 'start', color: 'red', fontWeight: 'bolder', marginBottom: '10px' }}>변경 할 금액 </div>
                    <div className="Input_For_Price_Container">
                        <div className="Input_Left_Container">
                            <div>대한민국</div>
                            <div>KRW</div>
                        </div>
                        <div className="Input_Right_Container">
                            <div className="Price_Input_Container">
                                <input value={Change_Sell_Price_State} onChange={e => setChange_Sell_Price_State(e.target.value)}></input>
                            </div>
                            <div style={{ fontSize: '13px', color: 'gray' }}>{numberToKorean(Change_Sell_Price_State)} 원</div>
                        </div>
                    </div>

                    <OnReturnButton BackColors="#2985db" hoverBackColors="blue" onClick={() => Change_Sell_Price_Data()}>
                        {/* 판가 수정 */}
                        <div> 변 경 </div>
                    </OnReturnButton>
                    <CancelButton onClick={onClose}>
                        <div> 취 소 </div>
                    </CancelButton>
                </Modal>
            ) : (
                <Modal>
                    <Message>{onMessage}</Message>

                    <ButtonContainer>
                        <OnReturnButton BackColors="#2985db" hoverBackColors="blue" onClick={() => setChange_SellPrice_Modal(true)}>
                            {/* 판가 수정 */}
                            <div> 판 가 수 정 </div>
                        </OnReturnButton>
                        <OnReturnButton BackColors="#8dad59" hoverBackColors="green" onClick={onClose}>
                            {/* Excel 다운로드 */}
                            <ExcelDownload list={Select_Data}></ExcelDownload>
                        </OnReturnButton>
                        <OnReturnButton
                            BackColors="#e49125"
                            hoverBackColors="orange"
                            onClick={() =>
                                Navigate(
                                    `/Select/BOM/Lists/${Select_Data.source}/${Select_Data.MODEL}/${Select_Data.FSC_CD}/${
                                        Select_Data.source === 'PLM' ? Select_Data.FSC_CD : Select_Data.EQ_NO
                                    }`
                                )
                            }
                        >
                            {/* BOM 조회 */}
                            <div> B O M 조 회 </div>
                        </OnReturnButton>

                        <CancelButton onClick={onClose}>
                            <div> 취 소 </div>
                        </CancelButton>
                    </ButtonContainer>
                </Modal>
            )}
        </Overlay>
    );
};

export default ShowModal;
