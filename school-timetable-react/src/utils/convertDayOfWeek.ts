import { CONSTANT } from "../consts/constant";

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
