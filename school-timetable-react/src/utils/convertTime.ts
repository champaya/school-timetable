import { CONSTANT } from "../consts/constant";

/**
 * コード形式の時間を文字列に変換する共通関数
 *
 * @param time 時間(コード)
 * @returns 時間(文字列)
 */
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
