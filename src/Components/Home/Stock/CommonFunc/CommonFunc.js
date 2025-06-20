import moment from 'moment';

// 현재일 기준 년도의 따른 월별 구하기
export const getMonthsOfYearUntilNow = async year => {
    const current = moment();
    const currentYear = current.year();
    let monthCount;

    if (year < currentYear) {
        monthCount = 12; // 과거: 전체 월
    } else if (Number(year) === currentYear) {
        monthCount = current.month() + 1; // 현재 연도: 현재 월까지 (0-indexed)
    } else {
        monthCount = 0; // 미래 연도: 없음
    }

    return Array.from({ length: monthCount }, (_, i) => moment(`${year}-${i + 1}`, 'YYYY-M').format('YYYYMM'));
};

/// 원화 한글 표시를 위한 함수
export const numberToKorean = number => {
    const isNegative = number < 0;
    const inputNumber = Math.abs(number); // 절댓값 처리

    const unitWords = ['', '만', '억', '조', '경'];
    const splitUnit = 10000;
    const splitCount = unitWords.length;

    const resultArray = [];
    let resultString = '';

    for (let i = 0; i < splitCount; i++) {
        let unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0) {
            resultArray[i] = unitResult;
        }
    }

    for (let i = 0; i < resultArray.length; i++) {
        if (!resultArray[i]) continue;
        resultString = String(resultArray[i]) + unitWords[i] + ' ' + resultString;
    }

    resultString = resultString.trim(); // 마지막 공백 제거

    return isNegative ? '-' + resultString : resultString;
};

// 그룹핑 하기 위한 함수
export const Change_Grouping_Price = async GetData => {
    const grouped = await GetData.reduce((acc, item) => {
        const key = item.ItemSName;
        if (!acc[key]) {
            acc[key] = {
                category: key,
                totalPrice: 0,
                items: [],
            };
        }
        acc[key].totalPrice += item.Price;
        acc[key].items.push(item);
        return acc;
    }, {});

    const result = Object.values(grouped);
    const sortedResult = result.sort((a, b) => b.totalPrice - a.totalPrice);

    return sortedResult;
};

// 단위 기준으로 원화 한글 표시를 위한 함수
export function formatCurrency(value) {
    if (value >= 100000000) {
        // 억 단위 (소수 첫째 자리까지)
        return `${(value / 100000000).toFixed(1)}억`;
    } else if (value >= 10000000) {
        // 천만원 단위
        return `${(value / 10000).toFixed(1)}만`;
    } else if (value === 0) {
        return '';
    } else {
        // 기본 만원 단위 이하
        return `${value.toLocaleString()}`;
    }
}
