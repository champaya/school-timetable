import { CONSTANT } from "../consts/constant";

/**
 * コード形式の期間を文字列に変換する共通関数
 *
 * @param period 期間(コード)
 * @returns 期間(文字列)
 */
const convertPeriod = (period: number) => {
  let label = "";
  switch (period) {
    case CONSTANT.PERIOD.EARLY.value:
      label = CONSTANT.PERIOD.EARLY.label;
      break;
    case CONSTANT.PERIOD.LATE.value:
      label = CONSTANT.PERIOD.LATE.label;
      break;
  }

  return label;
};

export default convertPeriod;
