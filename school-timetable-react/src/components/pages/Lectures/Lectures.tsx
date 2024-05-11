import { useEffect, useState } from "react";
import useGetAPI from "../../../api/useGetAPI";
import { CONSTANT } from "../../../consts/constant";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import LecturesFilterModal from "./LecturesFilterModal";
import LecturesDetailModal from "./LecturesDetailModal";
import { GetLecture } from "./Lectures.model";
import useFilterLectures from "../../../hooks/useFilterLectures";
import convertDayOfWeek from "../../../utils/convertDayOfWeek";
import convertTime from "../../../utils/convertTime";
import convertPeriod from "../../../utils/convertPeriod";
import usePostAPI from "../../../api/usePostAPI";
import useDeleteAPI from "../../../api/useDeleteAPI";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

/** 授業一覧ページ */
const Lectures = () => {
  const [lectures, setLectures] = useState<GetLecture[]>([]);
  const filteredLectures = useFilterLectures(lectures);

  const getAPI = useGetAPI();
  const postAPI = usePostAPI();
  const deleteAPI = useDeleteAPI();

  /** コンポーネントマウント時に授業データを取得する */
  useEffect(() => {
    (async () => {
      const lectureResult = (await getAPI(
        CONSTANT.API.LECTURES,
        true
      )) as GetLecture[];
      setLectures(lectureResult);
    })();
  }, [getAPI]);

  /**
   * 「登録」ボタン押下時に発火
   *
   * @param lecture 押下行の授業
   */
  const handleClickRegister = async (lecture: GetLecture) => {
    // 授業を登録するAPI通信を行う
    await postAPI(CONSTANT.API.TIMETABLES, true, undefined, {
      user_id: Cookies.get(CONSTANT.COOKIES.UID),
      lecture_id: lecture.lecture_id,
    });
  };

  /**
   * 「削除」ボタン押下時に発火
   *
   * @param lecture 押下行の授業
   */
  const handleClickDelete = async (lecture: GetLecture) => {
    // 授業を削除するAPI通信を行う
    await deleteAPI(
      CONSTANT.API.TIMETABLES,
      true,
      Cookies.get(CONSTANT.COOKIES.ID),
      {
        lecture_id: lecture.lecture_id,
      }
    );
  };

  return (
    <>
      <h1>授業一覧</h1>
      <Link to={CONSTANT.ROUTE.USER_TIMETABLE}>授業一覧に戻る</Link>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>授業ID</TableCell>
              <TableCell>授業名</TableCell>
              <TableCell>単位数</TableCell>
              <TableCell>曜日</TableCell>
              <TableCell>時間</TableCell>
              <TableCell>前期/後期</TableCell>
              <TableCell>担当教授</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLectures.map((lecture, lectureIndex) => (
              <TableRow
                key={lectureIndex}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{lecture.lecture_id}</TableCell>
                <TableCell>{lecture.lecture_name}</TableCell>
                <TableCell>{lecture.credit_count}</TableCell>
                <TableCell>{convertDayOfWeek(lecture.day_of_week)}</TableCell>
                <TableCell>{convertTime(lecture.time)}</TableCell>
                <TableCell>{convertPeriod(lecture.period)}</TableCell>
                <TableCell>{lecture.teacher_name}</TableCell>
                <TableCell>
                  <LecturesDetailModal
                    lecture_id={lecture.lecture_id}
                    lecture_name={lecture.lecture_name}
                    credit_count={lecture.credit_count}
                    day_of_week={lecture.day_of_week}
                    time={lecture.time}
                    period={lecture.period}
                    teacher_name={lecture.teacher_name}
                    lecture_overview={lecture.lecture_overview}
                    teacher_id={lecture.teacher_id}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleClickRegister(lecture);
                    }}
                  >
                    登録
                  </Button>
                  <Button
                    onClick={() => {
                      handleClickDelete(lecture);
                    }}
                  >
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <LecturesFilterModal />
    </>
  );
};

export default Lectures;
