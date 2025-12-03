export const Million = 1000000;

export const CalculateMCPrice = (list) => {
  //Bom 이상으로 특정 BOM이 수량이 전부 다 곱해져서 나오는 경우가 발생 되어 이렇게 나누게 됨
  if ((list.MC_Price / list.EXPC_SEL_PRICE) * list.QTY * 100 > 100) {
    return Number((list.MC_Price + list.outSoucingPriceSum) / Million);
  } else {
    return Number(
      (list.MC_Price * list.QTY + list.outSoucingPriceSum) / Million
    );
  }
};

export const CalculateMCPercent = (list) => {
  //Bom 이상으로 특정 BOM이 수량이 전부 다 곱해져서 나오는 경우가 발생 되어 이렇게 나누게 됨
  if ((list.MC_Price / list.EXPC_SEL_PRICE) * list.QTY * 100 > 100) {
    return Number(
      ((list.MC_Price + list.outSoucingPriceSum) / list.EXPC_SEL_PRICE) * 100
    );
  } else {
    return Number(
      ((list.MC_Price * list.QTY + list.outSoucingPriceSum) /
        list.EXPC_SEL_PRICE) *
        100
    );
  }
};
