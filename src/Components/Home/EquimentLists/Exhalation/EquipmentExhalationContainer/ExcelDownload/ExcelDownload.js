import React from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import { BsFillFileEarmarkExcelFill } from 'react-icons/bs';
import moment from 'moment';
import { toast } from '../../../../../ToastMessage/ToastManager';

const ExcelDownload = ({ list }) => {
    const fileName = `${moment().format('YYYYMMDD')}_${list.MODEL}_PART_LIST.xlsx`; // 다운로드할 파일 이름

    const handleDownload = async () => {
        try {
            const datas = await Changed_Excel_Data(); // data가 없으면 빈 배열
            const worksheet = await XLSX.utils.json_to_sheet(datas); // JSON 데이터를 시트로 변환
            worksheet['!cols'] = [{ wpx: 200 }, { wpx: 200 }, { wpx: 200 }];
            const workbook = await XLSX.utils.book_new(); // 엑셀 파일 생성하기
            await XLSX.utils.book_append_sheet(workbook, worksheet, 'PARTLIST'); // 생성된 엑셀 파일에 'Sheet1' 시트 추가
            await XLSX.writeFile(workbook, fileName); // 엑셀 파일로 저장 후 fileName 이름으로 저장

            toast.show({
                title: `다운로드가 완료 되었습니다.`,
                successCheck: true,
                duration: 6000,
            });
        } catch (error) {
            console.log(error);
            toast.show({
                title: `다운로드에 실패하였습니다. IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    const Changed_Excel_Data = async () => {
        if (list.Bom_Lists.length) {
            const Nothing_Info_Part_Lists = list.Bom_Lists.filter(item => item.ERP_PART.startsWith('R') && item.Purchase_price === 0);
            const Has_Info_Part_Lists = list.Bom_Lists.filter(item => item.ERP_PART.startsWith('R') && item.Purchase_price > 0);
            // console.log('Nothing_Info_Part_Lists', Nothing_Info_Part_Lists);
            // console.log('Has_Info_Part_Lists', Has_Info_Part_Lists);
            const All_Part_Info_Lists = Nothing_Info_Part_Lists.concat(Has_Info_Part_Lists);
            return All_Part_Info_Lists;
        } else {
            return [];
        }
    };

    return (
        <div onClick={handleDownload}>
            <div>EXCEL 다운로드</div>
        </div>
    );
};

export default ExcelDownload;
