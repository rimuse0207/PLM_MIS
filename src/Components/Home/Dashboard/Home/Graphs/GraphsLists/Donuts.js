import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const Donuts = ({ Pie_State, setClickData }) => {
    return (
        <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
            <ResponsivePie
                data={Pie_State}
                margin={{ top: 100, right: 0, bottom: 80, left: 0 }}
                innerRadius={0}
                padAngle={5}
                cornerRadius={0}
                colors={['#ebf0f5', '#ff6b6b', '#00b48e', '#ffa800', '#12203f']} // 커스터하여 사용할 때
                // colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
                borderWidth={0}
                arcLinkLabelsTextColor="#000000"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }} // pad 색상에 따라감
                arcLabelsSkipAngle={30}
                arcLinkLabelsDiagonalLength={10}
                arcLinkLabelsSkipAngle={6}
                onClick={e => {
                    if (e.id === 'DC/Module') setClickData('Module');
                    else setClickData(e.id);
                }}
                theme={{
                    labels: {
                        text: {
                            fontSize: '1.5vmin',
                            fill: '#000000',
                        },
                    },
                    legends: {
                        text: {
                            fontSize: '1.3vmin',
                            // fill: '#000000',
                        },
                    },
                }}
                legends={[
                    {
                        anchor: 'bottom', // 위치
                        direction: 'row', // item 그려지는 방향
                        justify: false, // 글씨, 색상간 간격 justify 적용 여부
                        translateX: 0, // chart와 X 간격
                        translateY: 56, // chart와 Y 간격
                        itemsSpacing: 20, // item간 간격
                        itemWidth: 100, // item width
                        itemHeight: 18, // item height
                        itemDirection: 'left-to-right', // item 내부에 그려지는 방향
                        itemOpacity: 1, // item opacity
                        symbolSize: 15, // symbol (색상 표기) 크기
                        symbolShape: 'square', // symbol (색상 표기) 모양
                    },
                ]}
                layers={[
                    'arcs',
                    'arcLinkLabels',
                    'legends',
                    ({ centerX, centerY, dataWithArc }) => {
                        const total = Pie_State.reduce((sum, d) => sum + d.value, 0);
                        return dataWithArc.map(datum => {
                            const { startAngle, endAngle, outerRadius } = datum.arc;

                            // 중심각 보정 (시계 방향으로 -90도 회전)
                            const angle = (startAngle + endAngle) / 2 - Math.PI / 2;

                            const radius = outerRadius * 0.7;
                            const x = centerX + radius * Math.cos(angle);
                            const y = centerY + radius * Math.sin(angle);
                            const percent = ((datum.value / total) * 100).toFixed(1);

                            return (
                                <g key={datum.id}>
                                    <text
                                        x={x}
                                        y={y - 6}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        style={{
                                            fill: '#000',
                                            fontSize: '2vmin',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {percent > 2 ? `${datum.value.toLocaleString('ko-kr')} M` : ''}
                                    </text>
                                    <text
                                        x={x}
                                        y={y + 15}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        style={{
                                            fill: '#000',
                                            fontSize: '2vmin',
                                        }}
                                    >
                                        {percent > 2 ? `${percent}%` : ''}
                                    </text>
                                </g>
                            );
                        });
                    },
                ]}
                tooltip={({ datum }) => {
                    const total = Pie_State.reduce((sum, d) => sum + d.value, 0);
                    const percent = ((datum.value / total) * 100).toFixed(1);
                    return (
                        <div
                            style={{
                                padding: 10,
                                background: 'white',
                                border: '1px solid #ccc',
                                color: '#000',
                            }}
                        >
                            <strong>{datum.label}</strong>
                            <br />
                            매출: {datum.value.toLocaleString('ko-kr')} M
                            <br />
                            비율: {percent}%
                        </div>
                    );
                }}
            />
        </div>
    );
};
export default Donuts;
