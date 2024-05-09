import { CONSTANT } from "../consts/constant";

/**
 * コード形式の曜日を文字列に変換する共通関数
 *
 * @param day_of_week 曜日(コード)
 * @returns 曜日(文字列)
 */
const convertDayOfWeek = (day_of_week: number) => {
  let label = "";
  switch (day_of_week) {
    case CONSTANT.DAY_OF_WEEk.MONDAY.value:
      label = CONSTANT.DAY_OF_WEEk.MONDAY.label;
      break;
    case CONSTANT.DAY_OF_WEEk.TUESDAY.value:
      label = CONSTANT.DAY_OF_WEEk.TUESDAY.label;
      break;
    case CONSTANT.DAY_OF_WEEk.WEDNESDAY.value:
      label = CONSTANT.DAY_OF_WEEk.WEDNESDAY.label;
      break;
    case CONSTANT.DAY_OF_WEEk.THURSDAY.value:
      label = CONSTANT.DAY_OF_WEEk.THURSDAY.label;
      break;
    case CONSTANT.DAY_OF_WEEk.FRIDAY.value:
      label = CONSTANT.DAY_OF_WEEk.FRIDAY.label;
      break;
  }

  return label;
};

export default convertDayOfWeek;
