import React from 'react';

const EquipmentExhalationContainer = ({ list }) => {
    return (
        <div>
            <div className="Title_Container">
                <div className="Title_Left_Container">
                    <h2>{list.MODEL}</h2>
                </div>
                <div className="Title_Right_Container">
                    <div>{list.EQNO_BY_MODEL} 호기</div>
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
        </div>
    );
};
export default EquipmentExhalationContainer;
