import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import styled from 'styled-components';
import { BarsMainDivBox } from '../../../Dashboard/Home/Graphs/GraphsLists/Bars';
import moment from 'moment';

const StockBarGraph = ({ Stock_Bar_State }) => {
    // 시각화 전용 데이터 가공 (원본은 그대로)
    const adjustedData = Stock_Bar_State.map(item => ({
        ...item,
        profit: item.price,
    }));
    const maxValue = Math.max(...Stock_Bar_State.map(d => Math.max(d.price))) * 1.3;
    return (
        <BarsMainDivBox style={{ height: '90%' }}>
            <ResponsiveBar
                data={adjustedData}
                maxValue={maxValue}
                keys={['profit']}
                indexBy="dates"
                margin={{ top: 50, right: 0, bottom: 60, left: 0 }}
                padding={0.7}
                groupMode="stacked"
                colors={['skyblue', 'gray']}
                colorBy="id"
                theme={{
                    labels: { text: { fontSize: '2vmin', fill: '#000000' } },
                    legends: { text: { fontSize: '2vmin', fill: '#000000' } },
                    axis: {
                        legend: { text: { fontSize: '1.5vmin', fill: '#000000' } },
                        ticks: { text: { fontSize: '1.5vmin', fill: '#000000' } },
                    },
                }}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendPosition: 'middle',
                    legendOffset: 20,
                    format: value => `${moment(value.toLocaleString()).format('MM월')}`,
                }}
                axisLeft={null}
                markers={[
                    {
                        axis: 'y',
                        value: 0,
                        lineStyle: { stroke: 'lightgray', strokeWidth: 1 }, // 실선 스타일
                    },
                ]}
                enableGridY={false}
                enableLabel={false}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'top-right',
                        direction: 'row',
                        translateX: 0,
                        translateY: -50,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemsSpacing: 2,
                        symbolSize: 20,
                        itemDirection: 'left-to-right',
                        data: [
                            // { id: 'MC', label: 'MC', color: 'skyblue' },
                            { id: 'profit', label: '단가', color: 'skyblue' },
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

                                if (!price || price === 0) return null;

                                return (
                                    <text
                                        key={`${bar.key}-percent`}
                                        x={bar.x + bar.width / 2}
                                        y={bar.y - 30}
                                        textAnchor="middle"
                                        style={{
                                            fill: 'black',
                                            fontSize: '2vmin',
                                            fontWeight: 'bold',
                                            pointerEvents: 'none', // 마우스 이벤트 막기
                                        }}
                                    >
                                        {price.toLocaleString('ko-KR')}
                                    </text>
                                );
                            });
                    },
                ]}
                tooltip={({ id, value, indexValue, data }) => {
                    return (
                        <div
                            style={{
                                padding: '6px 9px',
                                background: 'white',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                color: 'black',
                                fontSize: '2vmin',
                            }}
                        >
                            <strong>{moment(indexValue).format('YYYY년 MM월')}</strong>
                            <br />
                            재고 금액: {data.price.toLocaleString('ko-KR')} 억원
                        </div>
                    );
                }}
            />
        </BarsMainDivBox>
    );
};

export default StockBarGraph;
