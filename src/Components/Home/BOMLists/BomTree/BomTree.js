import React from 'react';

const BomTree = ({ list, depth = 1 }) => {
    // if (list.children.length > 0) {
    return (
        <>
            <tr>
                <td style={{ paddingLeft: `${10 * depth}px` }}>{list.ERP_PART}</td>
                <td>{list.Part_Qty} ea</td>
                <td>{Math.ceil(list.Purchase_price).toLocaleString('ko-KR')} 원</td>
                <td>{Math.ceil(list.Purchase_price * Number(list.Part_Qty)).toLocaleString('ko-KR')} 원</td>
                <td>{list.assyGbnNm}</td>
                <td>{list.itemGrpNm}</td>
                <td>{list.partNm}</td>
                <td>{list.partSpec}</td>
                <td>{list.partTypePlmNm}</td>
                <td>{list.procNm}</td>
            </tr>
            {list.children.length > 0 ? (
                list.children.map(child => {
                    return <BomTree list={child} depth={depth + 1}></BomTree>;
                })
            ) : (
                <></>
            )}
        </>
    );
};

export default React.memo(BomTree);
