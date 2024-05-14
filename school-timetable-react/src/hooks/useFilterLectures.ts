import { wrappedUseSelector } from "../redux/store/store";
import { ResponseGetLecture } from "../components/pages/Lectures/Lectures.model";
import { CONSTANT } from "../consts/constant";

/**
 * 条件に応じて授業の絞り込みを行うカスタムフック
 *
 * @param lectures 授業一覧
 * @returns 絞り込み後授業一覧
 */
const useFilterLectures = (lectures: ResponseGetLecture[]) => {
  const filterLectures = wrappedUseSelector((state) => state.filterLecture);

  // すべてでない場合、授業IDで絞り込み
  if (filterLectures.lecture_id !== CONSTANT.LECTURE_ID.ALL.value) {
    lectures = lectures.filter(
      (lecture) => lecture.lecture_id === filterLectures.lecture_id
    );
  }
  // すべてでない場合、曜日で絞り込み
  if (filterLectures.day_of_week !== CONSTANT.DAY_OF_WEEk.ALL.value) {
    lectures = lectures.filter(
      (lecture) => lecture.day_of_week === filterLectures.day_of_week
    );
  }
  // すべてでない場合、時間で絞り込み
  if (filterLectures.time !== CONSTANT.TIME.ALL.value) {
    lectures = lectures.filter(
      (lecture) => lecture.time === filterLectures.time
    );
  }
  // すべてでない場合、前期/後期で絞り込み
  if (filterLectures.period !== CONSTANT.PERIOD.ALL.value) {
    lectures = lectures.filter(
      (lecture) => lecture.period === filterLectures.period
    );
  }

  return [...lectures];
};

export default useFilterLectures;
