/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import useGetAPI from "../../../api/useGetAPI";
import { CONSTANT } from "../../../consts/constant";
import { useDispatch } from "react-redux";
import { setFilterCondition } from "../../../redux/slice/FilterLectureSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { GetTimeTable } from "./UserTimetable.model";

/** ユーザ別時間割ページ */
const UserTimetable = () => {
  const [timetable, setTimetable] = useState<GetTimeTable[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(1);

  const getAPI = useGetAPI();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** コンポーネントマウント時に登録済み時間割データを取得する */
  useEffect(() => {
    (async () => {
      const timetableResult = (await getAPI(
        CONSTANT.API.TIMETABLES,
        true,
        Cookies.get("_id")
      )) as GetTimeTable[];
      setTimetable(timetableResult);
    })();
  }, [getAPI]);

  /**
   * 時間割データを時間/曜日が適切な場所に表示できるように設定する
   *
   * @param table サーバから取得した登録済み時間割データ
   * @returns 表示用時間割データ
   */
  const sortTimeTable = (table: GetTimeTable[]) => {
    const forDisplayArray: GetTimeTable[][] = [[], [], [], [], []];
    table.forEach((item) => {
      for (let i = 1; i < 5; i++)
        item.time === i && item.period === selectedPeriod
          ? forDisplayArray[i - 1].push(item)
          : forDisplayArray[i - 1].push({});
    });
    return forDisplayArray;
  };

  /**
   * 授業コマ押下時の処理 \
   * 絞り込みを設定して、授業一覧の画面に遷移する
   *
   * @param lecture_id 授業ID
   * @param day_of_week 曜日
   * @param time 時間
   * @param period 前期/後期
   */
  const handleClickLecture = (
    lecture_id: number,
    day_of_week: number,
    time: number,
    period: number
  ) => {
    dispatch(setFilterCondition({ lecture_id, day_of_week, time, period }));
    navigate(CONSTANT.ROUTE.LECTURES);
  };

  /**
   * 選択している期の単位数合計を計算する
   *
   * @param table サーバから取得した登録済み時間割データ
   * @returns 合計値
   */
  const sumCreditCount = (table: GetTimeTable[]) => {
    let total = 0;
    table.forEach((lecture) => {
      if (lecture.period === selectedPeriod) {
        total = total + (lecture.credit_count ?? 0);
      }
    });
    return total;
  };

  return (
    <div>
      <h1>時間割</h1>
      <div css={selectContainer}>
        合計単位数:
        {sumCreditCount(timetable)}
        <FormControl>
          <Select
            value={selectedPeriod}
            onChange={(e) => {
              setSelectedPeriod(e.target.value as number);
            }}
            defaultValue={CONSTANT.PERIOD.EARLY.value}
          >
            <MenuItem value={CONSTANT.PERIOD.EARLY.value}>前期</MenuItem>
            <MenuItem value={CONSTANT.PERIOD.LATE.value}>後期</MenuItem>
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>月</TableCell>
              <TableCell>火</TableCell>
              <TableCell>水</TableCell>
              <TableCell>木</TableCell>
              <TableCell>金</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* itemIndexが 時間 -1 と対応 */}
            {sortTimeTable(timetable).map((item, itemIndex) => (
              <TableRow
                key={itemIndex}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {itemIndex + 1}時限目
                </TableCell>
                {/* lectureIndexが 曜日 -1 と対応 */}
                {item.map((lecture, lectureIndex) => {
                  return (
                    <TableCell
                      key={lectureIndex}
                      //   授業登録済みのコマは授業ID,曜日,時間を持つが、未登録のコマは授業ID.曜日,時間を持たないため
                      //   授業ID⇒無効値（-1）、曜日⇒lectureIndex + 1、時間⇒itemIndex + 1を引数で渡して絞り込み条件を設定する
                      onClick={() => {
                        handleClickLecture(
                          lecture.lecture_id ?? -1,
                          lecture.day_of_week ?? lectureIndex + 1,
                          lecture.time ?? itemIndex + 1,
                          selectedPeriod
                        );
                      }}
                    >
                      {lecture.lecture_name}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const selectContainer = css`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 1rem;
`;

export default UserTimetable;
