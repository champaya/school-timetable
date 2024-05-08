import { CONSTANT } from "../consts/constant";

const convertTime = (time: number) => {
  let label = "";
  switch (time) {
    case CONSTANT.TIME.FIRST_CLASS.value:
      label = CONSTANT.TIME.FIRST_CLASS.label;
      break;
    case CONSTANT.TIME.SECOND_CLASS.value:
      label = CONSTANT.TIME.SECOND_CLASS.label;
      break;
    case CONSTANT.TIME.THIRD_CLASS.value:
      label = CONSTANT.TIME.THIRD_CLASS.label;
      break;
    case CONSTANT.TIME.FOURTH_CLASS.value:
      label = CONSTANT.TIME.FOURTH_CLASS.label;
      break;
    case CONSTANT.TIME.FIFTH_CLASS.value:
      label = CONSTANT.TIME.FIFTH_CLASS.label;
      break;
  }

  return label;
};

export default convertTime;
