import { CONSTANT } from "../consts/constant";

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
