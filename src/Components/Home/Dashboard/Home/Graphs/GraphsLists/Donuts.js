import React from 'react';
import { ResponsivePie } from '@nivo/pie';
const data = [
    {
        id: 'DC/Module',
        label: 'DC/Module',
        value: 200,
        color: 'hsl(149, 70%, 50%)',
    },
    {
        id: 'MBT',
        label: 'MBT',
        value: 200,
        color: 'hsl(338, 70%, 50%)',
    },
    {
        id: 'Storage',
        label: 'Storage',
        value: 200,
        color: 'hsl(116, 70%, 50%)',
    },
    {
        id: 'SoC',
        label: 'SoC',
        value: 200,
        color: 'hsl(55, 70%, 50%)',
    },
    {
        id: 'CLT',
        label: 'CLT',
        value: 200,
        color: 'hsl(84, 70%, 50%)',
    },
];
const Donuts = () => {
    return (
        <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 0, bottom: 80, left: 0 }}
                innerRadius={0}
                padAngle={1}
                cornerRadius={0}
                colors={['skyblue', 'orange', 'gray', 'gold', 'green', 'purple']} // 커스터하여 사용할 때
                // colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
                borderWidth={0}
                arcLinkLabelsSkipAngle={0}
                arcLinkLabelsTextColor="#000000"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }} // pad 색상에 따라감
                arcLabelsSkipAngle={10}
                animate={true} // 애니메이션 활성화
                motionConfig="gentle" // 애니메이션 설정, 없으면 기본값
                theme={{
                    labels: {
                        text: {
                            fontSize: 14,
                            fill: '#000000',
                        },
                    },
                    legends: {
                        text: {
                            fontSize: 12,
                            fill: '#000000',
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
                        itemsSpacing: 0, // item간 간격
                        itemWidth: 100, // item width
                        itemHeight: 18, // item height
                        itemDirection: 'left-to-right', // item 내부에 그려지는 방향
                        itemOpacity: 1, // item opacity
                        symbolSize: 18, // symbol (색상 표기) 크기
                        symbolShape: 'circle', // symbol (색상 표기) 모양
                        justify: false,
                    },
                ]}
                layers={[
                    'arcs',
                    'arcLinkLabels',
                    'legends',
                    ({ centerX, centerY, dataWithArc }) => {
                        const total = data.reduce((sum, d) => sum + d.value, 0);
                        return dataWithArc.map(datum => {
                            const { startAngle, endAngle, outerRadius } = datum.arc;

                            // ⭐ 중심각 보정 (시계 방향으로 -90도 회전)
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
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {datum.value}
                                    </text>
                                    <text
                                        x={x}
                                        y={y + 8}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        style={{
                                            fill: '#fff',
                                            fontSize: 11,
                                        }}
                                    >
                                        {percent}%
                                    </text>
                                </g>
                            );
                        });
                    },
                ]}
                tooltip={({ datum }) => {
                    const total = data.reduce((sum, d) => sum + d.value, 0);
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
                            매출: {datum.value}
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
