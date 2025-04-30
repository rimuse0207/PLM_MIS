import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
// const Data = [
//     {
//         id: '판가',
//         data: [
//             {
//                 x: '1호기',
//                 y: 19,
//             },
//             {
//                 x: '2호기',
//                 y: 272,
//             },
//             {
//                 x: '3호기',
//                 y: 105,
//             },
//             {
//                 x: '4호기',
//                 y: 212,
//             },
//             {
//                 x: '5호기',
//                 y: 232,
//             },
//             {
//                 x: '6호기',
//                 y: 2,
//             },
//         ],
//     },
//     {
//         id: 'MC',
//         data: [
//             {
//                 x: '1호기',
//                 y: 15,
//             },
//             {
//                 x: '2호기',
//                 y: 164,
//             },
//             {
//                 x: '3호기',
//                 y: 122,
//             },
//             {
//                 x: '4호기',
//                 y: 172,
//             },
//             {
//                 x: '5호기',
//                 y: 291,
//             },
//             {
//                 x: '6호기',
//                 y: 235,
//             },
//         ],
//     },
// ];
const Charts = ({ Model_Name, Graph_Data, Rate_Check }) => {
    const [YAxisMax, setyAxisMax] = useState(0);
    useEffect(() => {
        const maxValue = Math.max(...Graph_Data.flatMap(series => series.data.map(point => point.y)));
        console.log('maxValue', maxValue);
        const yAxisMax = Math.ceil(maxValue * 2); // 10% 여유
        setyAxisMax(yAxisMax);
    }, [Graph_Data]);
    return (
        <div style={{ width: '100%', height: '300px', textAlign: 'center' }}>
            <ResponsiveLine
                data={Graph_Data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false,

                    min: 0,
                    max: Rate_Check ? 100 : YAxisMax,
                }}
                // yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: `${Model_Name}`,
                    legendOffset: 36,
                    legendPosition: 'middle',
                    truncateTickAt: 0,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: Rate_Check ? '%' : '1천만원',
                    legendOffset: -40,
                    legendPosition: 'top',
                    truncateTickAt: 0,
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'seriesColor' }}
                pointLabelYOffset={-12}
                enableTouchCrosshair={true}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
                role="application"
            />
        </div>
    );
};

export default Charts;
