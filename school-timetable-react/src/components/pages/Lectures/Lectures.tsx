/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
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
  styled,
} from "@mui/material";
import LecturesFilterModal from "./LecturesFilterModal";
import LecturesDetailModal from "./LecturesDetailModal";
import { ResponseGetLecture } from "./Lectures.model";
import useFilterLectures from "../../../hooks/useFilterLectures";
import convertDayOfWeek from "../../../utils/convertDayOfWeek";
import convertTime from "../../../utils/convertTime";
import convertPeriod from "../../../utils/convertPeriod";
import usePostAPI from "../../../api/usePostAPI";
import useDeleteAPI from "../../../api/useDeleteAPI";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { resetFilterCondition } from "../../../redux/slice/FilterLectureSlice";
import { wrappedUseSelector } from "../../../redux/store/store";
import { AxiosResponse } from "axios";

/** 授業一覧ページ */
const Lectures = () => {
  const [lectures, setLectures] = useState<ResponseGetLecture[]>([]);
  const filteredLectures = useFilterLectures(lectures);

  const getAPI = useGetAPI();
  const postAPI = usePostAPI();
  const deleteAPI = useDeleteAPI();

  const filterCondition = wrappedUseSelector((state) => state.filterLecture);
  const dispatch = useDispatch();

  /** コンポーネントマウント時に授業データを取得する */
  useEffect(() => {
    getAPI(
      CONSTANT.API.LECTURES,
      true,
      CONSTANT.ERROR_MESSAGE.LECTURES_GET
    ).then((response: AxiosResponse<ResponseGetLecture[]>) => {
      setLectures(response.data);
    });
  }, [getAPI]);

  /**
   * 「登録」ボタン押下時に発火
   *
   * @param lecture 押下行の授業
   */
  const handleClickRegister = (lecture: ResponseGetLecture) => {
    // 授業を登録するAPI通信を行う
    postAPI(
      CONSTANT.API.TIMETABLES,
      true,
      CONSTANT.ERROR_MESSAGE.TIMETABLES_POST,
      undefined,
      {
        user_id: Cookies.get(CONSTANT.COOKIES.ID),
        lecture_id: lecture.lecture_id,
      }
    );
  };

  /**
   * 「削除」ボタン押下時に発火
   *
   * @param lecture 押下行の授業
   */
  const handleClickDelete = (lecture: ResponseGetLecture) => {
    // 授業を削除するAPI通信を行う
    deleteAPI(
      CONSTANT.API.TIMETABLES,
      true,
      CONSTANT.ERROR_MESSAGE.TIMETABLES_DELETE,
      Cookies.get(CONSTANT.COOKIES.ID),
      {
        lecture_id: lecture.lecture_id,
      }
    );
  };

  return (
    <div css={lectureContainer}>
      <h1>授業一覧</h1>
      <h3>絞り込み条件</h3>
      <div css={filterContainer}>
        <div css={fileterConditionLabel}>
          授業ID{"　 "}：
          {filterCondition.lecture_id === CONSTANT.LECTURE_ID.ALL.value
            ? "すべて"
            : filterCondition.lecture_id}
          <br />
          時間{"　　 "}：
          {filterCondition.time === CONSTANT.TIME.ALL.value
            ? CONSTANT.TIME.ALL.label
            : convertTime(filterCondition.time)}
        </div>
        <div css={fileterConditionLabel}>
          曜日{"　　 "}：
          {filterCondition.day_of_week === CONSTANT.DAY_OF_WEEk.ALL.value
            ? CONSTANT.DAY_OF_WEEk.ALL.label
            : convertDayOfWeek(filterCondition.day_of_week)}
          <br />
          前期/後期：
          {filterCondition.period === CONSTANT.PERIOD.ALL.value
            ? CONSTANT.PERIOD.ALL.label
            : convertPeriod(filterCondition.period)}
        </div>
        <div css={filterButtonContainer}>
          <LecturesFilterModal />
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              dispatch(resetFilterCondition());
            }}
          >
            絞り込みクリア
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <ThTableCell align="center">授業ID</ThTableCell>
              <ThTableCell>授業名</ThTableCell>
              <ThTableCell align="center">単位数</ThTableCell>
              <ThTableCell align="center">曜日</ThTableCell>
              <ThTableCell align="center">時間</ThTableCell>
              <ThTableCell align="center">前期/後期</ThTableCell>
              <ThTableCell align="center">担当教授</ThTableCell>
              <ThTableCell align="center"></ThTableCell>
              <ThTableCell align="center"></ThTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLectures.map((lecture, lectureIndex) => (
              <TableRow key={lectureIndex}>
                {/* 固有のスタイルをsxで付与 */}
                <TdTableCell
                  align="center"
                  sx={{ width: "80px", boxSizing: "border-box" }}
                >
                  <div css={lectureIdContainer}>{lecture.lecture_id}</div>
                </TdTableCell>
                {/* 固有のスタイルをsxで付与 */}
                <TdTableCell sx={{ width: "300px", boxSizing: "border-box" }}>
                  <div css={lectureNameContainer}>{lecture.lecture_name}</div>
                </TdTableCell>
                <TdTableCell align="center">{lecture.credit_count}</TdTableCell>
                <TdTableCell align="center">
                  {convertDayOfWeek(lecture.day_of_week)}
                </TdTableCell>
                <TdTableCell align="center">
                  {convertTime(lecture.time)}
                </TdTableCell>
                <TdTableCell align="center">
                  {convertPeriod(lecture.period)}
                </TdTableCell>
                {/* 固有のスタイルをsxで付与 */}
                <TdTableCell
                  align="center"
                  sx={{ width: "100px", boxSizing: "border-box" }}
                >
                  <div css={teacherNameContainer}>{lecture.teacher_name}</div>
                </TdTableCell>
                <TdTableCell align="center">
                  <LecturesDetailModal
                    lecture_name={lecture.lecture_name}
                    credit_count={lecture.credit_count}
                    day_of_week={lecture.day_of_week}
                    time={lecture.time}
                    period={lecture.period}
                    teacher_name={lecture.teacher_name}
                    lecture_overview={lecture.lecture_overview}
                  />
                </TdTableCell>
                <TdTableCell>
                  <div css={tableCellButtonContainer}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        handleClickRegister(lecture);
                      }}
                    >
                      登録
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        handleClickDelete(lecture);
                      }}
                    >
                      削除
                    </Button>
                  </div>
                </TdTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const lectureContainer = css`
  padding: 0.5rem 3rem;

  h1 {
    margin: 1rem 0;
  }
  h3 {
    margin: 0;
    padding-left: 2rem;
  }
`;

const filterContainer = css`
  padding: 0 2rem 0.1rem;
  display: flex;
  justify-content: space-between;
`;

const fileterConditionLabel = css`
  display: flex;
  align-items: center;
  width: 15rem;
`;

const filterButtonContainer = css`
  display: grid;
  place-content: center;
  gap: 0.5rem;
`;

/**
 * thのセル用にTableCellをラップ
 */
const ThTableCell = styled(TableCell)`
  color: #696969;
  font-weight: bold;
  padding: 1rem 0.4rem;
`;

/**
 * tdのセル用にTableCellをラップ
 */
const TdTableCell = styled(TableCell)`
  color: #696969;
  font-weight: 500;
  padding: 0.4rem;
  overflow: hidden;
`;

/**
 * 授業IDが動的に変わるため幅設定と、3点リーダ設定を入れる
 */
const lectureIdContainer = css`
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/**
 * 授業名が動的に変わるため幅設定と、3点リーダ設定を入れる
 */
const lectureNameContainer = css`
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/**
 * 授業名が動的に変わるため幅設定と、3点リーダ設定を入れる
 */
const teacherNameContainer = css`
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const tableCellButtonContainer = css`
  display: grid;
  gap: 0.3rem;
`;

export default Lectures;
