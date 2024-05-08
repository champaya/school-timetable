import { wrappedUseSelector } from "../redux/store/store";
import { GetLecture } from "../components/pages/Lectures/Lectures.model";

const useFilterLectures = (lectures: GetLecture[]) => {
  const filterLectures = wrappedUseSelector((state) => state.filterLecture);

  //   授業IDで絞り込み
  if (filterLectures.lecture_id !== -1) {
    lectures = lectures.filter(
      (lecture) => lecture.lecture_id === filterLectures.lecture_id
    );
  }
  //   曜日で絞り込み
  if (filterLectures.day_of_week !== -1) {
    lectures = lectures.filter(
      (lecture) => lecture.day_of_week === filterLectures.day_of_week
    );
  }
  //   前期/後期で絞り込み
  if (filterLectures.period !== -1) {
    lectures = lectures.filter(
      (lecture) => lecture.period === filterLectures.period
    );
  }
  //   時間で絞り込み
  if (filterLectures.time !== -1) {
    lectures = lectures.filter(
      (lecture) => lecture.time === filterLectures.time
    );
  }

  return [...lectures];
};

export default useFilterLectures;
