import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const data = [
    {
        country: 'AD',
        'hot dog': 163,
        burger: 49,
        sandwich: 85,
        kebab: 156,
        fries: 63,
        donut: 63,
    },
    {
        country: 'AE',
        'hot dog': 132,
        burger: 106,
        sandwich: 71,
        kebab: 199,
        fries: 4,
        donut: 23,
    },
    {
        country: 'AF',
        'hot dog': 35,
        burger: 92,
        sandwich: 172,
        kebab: 81,
        fries: 96,
        donut: 102,
    },
    {
        country: 'AG',
        'hot dog': 165,
        burger: 31,
        sandwich: 161,
        kebab: 72,
        fries: 25,
        donut: 94,
    },
    {
        country: 'AI',
        'hot dog': 30,
        burger: 153,
        sandwich: 86,
        kebab: 8,
        fries: 175,
        donut: 186,
    },
    {
        country: 'AL',
        'hot dog': 100,
        burger: 77,
        sandwich: 133,
        kebab: 112,
        fries: 2,
        donut: 174,
    },
    {
        country: 'AM',
        'hot dog': 115,
        burger: 62,
        sandwich: 57,
        kebab: 175,
        fries: 149,
        donut: 131,
    },
];
const Bars = () => {
    const barData = [
        { bottle: 'i7304C 6호기', MC: 1200, 판가: 1000 },
        { bottle: 'i7304C 5호기', MC: 2200, 판가: 3000 },
        { bottle: 'i7304C 4호기', MC: 3200, 판가: 5000 },
        { bottle: 'i7304C 3호기', MC: 3200, 판가: 5000 },
        { bottle: 'i7304C 2호기', MC: 3200, 판가: 5000 },
        { bottle: 'i7304C 1호기', MC: 3200, 판가: 5000 },
    ];
    // 데이터에서 최대 '판가' 값 추출
    const maxPrice = Math.max(...barData.map(d => d.판가));
    const customMaxValue = Math.floor(maxPrice * 0.3 + maxPrice);
    return (
        <div style={{ width: '100%', height: '90%', textAlign: 'center' }}>
            <ResponsiveBar
                /**
                 * chart에 사용될 데이터
                 */

                data={[
                    { bottle: 'i7304C 6호기', MC: 1200, 판가: 2000 },
                    { bottle: 'i7304C 5호기', MC: 2200, 판가: 3000 },
                    { bottle: 'i7304C 4호기', MC: 3200, 판가: 5000 },
                    { bottle: 'i7304C 3호기', MC: 3200, 판가: 5000 },
                    { bottle: 'i7304C 2호기', MC: 3200, 판가: 5000 },
                    { bottle: 'i7304C 1호기', MC: 3200, 판가: 5000 },
                ]}
                // maxValue={customMaxValue} // ✅ 최대값을 데이터 최대값의 0.3배로 설정
                groupMode="overlay" // 겹쳐서
                /**
                 * chart에 보여질 데이터 key (측정되는 값)
                 */
                keys={['MC', '판가']}
                /**
                 * keys들을 그룹화하는 index key (분류하는 값)
                 */
                indexBy="bottle"
                /**
                 * chart margin
                 */
                margin={{ top: 50, right: 100, bottom: 30, left: 60 }}
                /**
                 * chart padding (bar간 간격)
                 */
                padding={0.7}
                /**
                 * chart 색상
                 */
                colors={['skyblue', 'gray']} // 커스터하여 사용할 때
                // colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
                /**
                 * color 적용 방식
                 */
                colorBy="id" // 색상을 keys 요소들에 각각 적용
                // colorBy="indexValue" // indexBy로 묵인 인덱스별로 각각 적용
                theme={{
                    /**
                     * label style (bar에 표현되는 글씨)
                     */
                    labels: {
                        text: {
                            fontSize: 10,
                            fill: '#000000',
                        },
                    },
                    /**
                     * legend style (default로 우측 하단에 있는 색상별 key 표시)
                     */
                    legends: {
                        text: {
                            fontSize: 12,
                            fill: '#000000',
                        },
                    },
                    axis: {
                        /**
                         * axis legend style (bottom, left에 있는 글씨)
                         */
                        legend: {
                            text: {
                                fontSize: 10,
                                fill: '#000000',
                            },
                        },
                        /**
                         * axis ticks style (bottom, left에 있는 값)
                         */
                        ticks: {
                            text: {
                                fontSize: 10,
                                fill: '#000000',
                            },
                        },
                    },
                }}
                /**
                 * axis bottom 설정
                 */
                axisBottom={{
                    tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
                    tickPadding: 5, // tick padding
                    tickRotation: 0, // tick 기울기
                    // legend: 'bottle', // bottom 글씨
                    legendPosition: 'middle', // 글씨 위치
                    legendOffset: 20, // 글씨와 chart간 간격
                }}
                /**
                 * axis left 설정
                 */
                axisLeft={{
                    tickSize: 1, // 값 설명하기 위해 튀어나오는 점 크기
                    tickPadding: 20, // tick padding
                    tickRotation: 0, // tick 기울기
                    // legend: 'price', // left 글씨
                    legendPosition: 'middle', // 글씨 위치
                    legendOffset: -40, // 글씨와 chart간 간격
                }}
                /**
                 * label 안보이게 할 기준 width
                 */

                /**
                 * label 안보이게 할 기준 height
                 */

                /**
                 * bar 클릭 이벤트
                 */
                // onClick={handle.barClick}
                /**
                 * legend 설정 (default로 우측 하단에 있는 색상별 key 표시)
                 */
                minValue={0}
                label={({ id, data }) => {
                    const cost = data['MC'];
                    const price = data['판가'];
                    if (id === '판가' && price !== 0) {
                        const percent = ((price - cost) / price) * 100;
                        return `${percent.toFixed(1)}%`;
                    }
                    return '';
                }}
                // labelSkipWidth={36}
                // labelSkipHeight={12}
                labelSkipWidth={0} // ✅ 내부 label 제거
                labelSkipHeight={0}
                // labelSkipWidth={999} // ✅ 내부 label 제거
                // labelSkipHeight={999}
                enableLabel={true} // 내부 label 완전 제거
                legends={[
                    {
                        dataFrom: 'keys', // 보일 데이터 형태
                        anchor: 'top-right', // 위치
                        direction: 'column', // item 그려지는 방향
                        justify: false, // 글씨, 색상간 간격 justify 적용 여부
                        translateX: 120, // chart와 X 간격
                        translateY: 0, // chart와 Y 간격
                        itemsSpacing: 2, // item간 간격
                        itemWidth: 100, // item width
                        itemHeight: 20, // item height
                        itemDirection: 'left-to-right', // item 내부에 그려지는 방향
                        itemOpacity: 0.85, // item opacity
                        symbolSize: 20, // symbol (색상 표기) 크기
                        effects: [
                            {
                                // 추가 효과 설정 (hover하면 item opacity 1로 변경)
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],

                        // onClick: handle.legendClick, // legend 클릭 이벤트
                    },
                ]}
                layers={[
                    'grid',
                    'axes',
                    'bars',
                    'markers',
                    'legends',
                    // Custom layer to draw percentage text
                    ({ bars }) => {
                        return bars
                            .filter(bar => bar.id === 'MC')
                            .map(bar => {
                                const price = bar.data.data['판가'];
                                const cost = bar.data.data['MC'];
                                if (!price || price === 0) return null;
                                const percent = ((price - cost) / price) * 100;
                                return (
                                    <text
                                        key={`${bar.key}-label`}
                                        x={bar.x + bar.width / 2}
                                        y={Math.min(bar.y, bars.find(b => b.index === bar.index && b.id === '판가')?.y || bar.y) - 10}
                                        textAnchor="middle"
                                        style={{
                                            fill: 'black',
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {percent.toFixed(1)}%
                                    </text>
                                );
                            });
                    },
                ]}
            />
        </div>
    );
};

export default Bars;
