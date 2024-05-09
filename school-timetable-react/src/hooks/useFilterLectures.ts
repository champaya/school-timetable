import { wrappedUseSelector } from "../redux/store/store";
import { GetLecture } from "../components/pages/Lectures/Lectures.model";

/**
 * 条件に応じて授業の絞り込みを行うカスタムフック
 *
 * @param lectures 授業一覧
 * @returns 絞り込み後授業一覧
 */
const useFilterLectures = (lectures: GetLecture[]) => {
  const filterLectures = wrappedUseSelector((state) => state.filterLecture);

  // 無効値でない場合、授業IDで絞り込み
  if (filterLectures.lecture_id !== -1) {
    lectures = lectures.filter(
      (lecture) => lecture.lecture_id === filterLectures.lecture_id
    );
  }
  // 無効値でない場合、曜日で絞り込み
  if (filterLectures.day_of_week !== -1) {
    lectures = lectures.filter(
      (lecture) => lecture.day_of_week === filterLectures.day_of_week
    );
  }
  // 無効値でない場合、前期/後期で絞り込み
  if (filterLectures.period !== -1) {
    lectures = lectures.filter(
      (lecture) => lecture.period === filterLectures.period
    );
  }
  // 無効値でない場合、時間で絞り込み
  if (filterLectures.time !== -1) {
    lectures = lectures.filter(
      (lecture) => lecture.time === filterLectures.time
    );
  }

  return [...lectures];
};

export default useFilterLectures;
