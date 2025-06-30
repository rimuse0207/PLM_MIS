import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import styled from 'styled-components';

export const BarsMainDivBox = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
    .Unit_Container {
        position: absolute;
        top: 00px;
        right: 80px;
    }
`;

const Bars = () => {
    const barData = [
        { equipments: 'i7304C 2호기', MC: 3013, price: 4120 },
        { equipments: 'i7304C 1호기', MC: 3106, price: 4120 },
    ];

    // 시각화 전용 데이터 가공 (원본은 그대로)
    const adjustedData = barData.map(item => ({
        ...item,
        profit: item.price - item.MC,
    }));
    const maxValue = Math.max(...barData.map(d => Math.max(d.MC, d.price))) * 1.3;
    return (
        <BarsMainDivBox>
            <ResponsiveBar
                data={adjustedData}
                maxValue={maxValue}
                keys={['MC', 'profit']}
                indexBy="equipments"
                margin={{ top: 120, right: 0, bottom: 60, left: 100 }}
                padding={0.7}
                groupMode="stacked"
                colors={['skyblue', 'gray']}
                colorBy="id"
                theme={{
                    labels: { text: { fontSize: '2vmin', fill: '#000000' } },
                    legends: { text: { fontSize: '2vmin', fill: '#000000' } },
                    axis: {
                        legend: { text: { fontSize: '1.5vmin', fill: '#000000' } },
                        ticks: { text: { fontSize: '2vmin', fill: '#000000' } },
                    },
                }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendPosition: 'middle',
                    legendOffset: 20,
                }}
                axisLeft={{
                    tickSize: 1,
                    tickPadding: 20,
                    tickRotation: 0,
                    legendPosition: 'middle',
                    legendOffset: -40,
                    tickValues: Array.from({ length: Math.ceil(maxValue / 1000) }, (_, i) => `${(i + 1) * 1000} `),
                    format: value => Number(value).toLocaleString('ko-kr') + ' M',
                }}
                enableGridY={false}
                enableLabel={false}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'top-right',
                        direction: 'row',
                        translateX: 30,
                        translateY: -110,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemsSpacing: 2,
                        symbolSize: 20,
                        itemDirection: 'left-to-right',
                        data: [
                            { id: 'MC', label: 'MC', color: 'skyblue' },
                            { id: 'profit', label: '단가', color: 'gray' },
                        ],
                    },
                ]}
                layers={[
                    'grid',
                    'axes',
                    'bars',
                    'markers',
                    'legends',
                    // ✅ 퍼센트 텍스트 추가 layer
                    ({ bars }) => {
                        return bars
                            .filter(bar => bar.data.id === 'profit')
                            .map(bar => {
                                const price = bar.data.data.price;
                                const MC = bar.data.data.MC;
                                if (!price || price === 0) return null;
                                const percent = (MC / price) * 100;

                                return (
                                    <text
                                        key={`${bar.key}-percent`}
                                        x={bar.x + bar.width / 2}
                                        y={bar.y - 30}
                                        textAnchor="middle"
                                        style={{
                                            fill: 'black',
                                            fontSize: '2.5vmin',
                                            fontWeight: 'bold',
                                            pointerEvents: 'none', // 마우스 이벤트 막기
                                        }}
                                    >
                                        {percent.toFixed(1)}%
                                    </text>
                                );
                            });
                    },
                ]}
                tooltip={({ id, value, indexValue, data }) => {
                    if (id === 'profit') {
                        return (
                            <div
                                style={{
                                    padding: '6px 9px',
                                    background: 'white',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    color: 'black',
                                    fontSize: '2.5vmin',
                                }}
                            >
                                <strong>{indexValue}</strong>
                                <br />
                                단가: {data.price.toLocaleString('ko-kr')}
                            </div>
                        );
                    } else {
                        return (
                            <div
                                style={{
                                    padding: '6px 9px',
                                    background: 'white',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    color: 'black',
                                    fontSize: '2.5vmin',
                                }}
                            >
                                <strong>{indexValue}</strong>
                                <br />
                                MC: {data.MC.toLocaleString('ko-kr')} M
                            </div>
                        );
                    }
                }}
            />
        </BarsMainDivBox>
    );
};

export default Bars;
