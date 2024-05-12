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
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import useGetAPI from "../../../api/useGetAPI";
import { CONSTANT } from "../../../consts/constant";
import { useDispatch } from "react-redux";
import { setFilterCondition } from "../../../redux/slice/FilterLectureSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { DisplayTimeTable, GetTimeTable } from "./UserTimetable.model";

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
      const timetableResult = await getAPI(
        CONSTANT.API.TIMETABLES,
        true,
        Cookies.get(CONSTANT.COOKIES.ID)
      );
      setTimetable(timetableResult.data as GetTimeTable[]);
    })();
  }, [getAPI]);

  /**
   * 時間割データを時間/曜日が適切な場所に表示できるように設定する
   *
   * @param table サーバから取得した登録済み時間割データ
   * @returns 表示用時間割データ
   */
  const sortTimeTable = (table: GetTimeTable[]) => {
    const forDisplayArray: DisplayTimeTable[] = [
      { monday: {}, tuesday: {}, wednesday: {}, thursday: {}, friday: {} },
      { monday: {}, tuesday: {}, wednesday: {}, thursday: {}, friday: {} },
      { monday: {}, tuesday: {}, wednesday: {}, thursday: {}, friday: {} },
      { monday: {}, tuesday: {}, wednesday: {}, thursday: {}, friday: {} },
      { monday: {}, tuesday: {}, wednesday: {}, thursday: {}, friday: {} },
    ];
    table.forEach((item) => {
      for (let i = 1; i < 6; i++)
        // 時間と期間が一致している場合のみ値を割り当てる
        if (item.time === i && item.period === selectedPeriod) {
          // 曜日に応じて値を割り当てるオブジェクト位置を変える
          switch (item.day_of_week) {
            case CONSTANT.DAY_OF_WEEk.MONDAY.value:
              forDisplayArray[i - 1].monday = item;
              break;
            case CONSTANT.DAY_OF_WEEk.TUESDAY.value:
              forDisplayArray[i - 1].tuesday = item;
              break;
            case CONSTANT.DAY_OF_WEEk.WEDNESDAY.value:
              forDisplayArray[i - 1].wednesday = item;
              break;
            case CONSTANT.DAY_OF_WEEk.THURSDAY.value:
              forDisplayArray[i - 1].thursday = item;
              break;
            case CONSTANT.DAY_OF_WEEk.FRIDAY.value:
              forDisplayArray[i - 1].friday = item;
              break;
          }
        }
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
    <div css={timetableContainer}>
      <div css={tableTitleContainer}>
        <h1>時間割</h1>
        <div css={selectContainer}>
          合計単位数:
          {sumCreditCount(timetable)}
          {/* 前期 or 後期を切り替えるセレクトボックス */}
          <FormControl>
            <Select
              value={selectedPeriod}
              onChange={(e) => {
                setSelectedPeriod(
                  typeof e.target.value === "number"
                    ? e.target.value
                    : Number.parseInt(e.target.value)
                );
              }}
              defaultValue={CONSTANT.PERIOD.EARLY.value}
            >
              <MenuItem value={CONSTANT.PERIOD.EARLY.value}>
                {CONSTANT.PERIOD.EARLY.label}
              </MenuItem>
              <MenuItem value={CONSTANT.PERIOD.LATE.value}>
                {CONSTANT.PERIOD.LATE.label}
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <ThTableCell></ThTableCell>
              <ThTableCell>月</ThTableCell>
              <ThTableCell>火</ThTableCell>
              <ThTableCell>水</ThTableCell>
              <ThTableCell>木</ThTableCell>
              <ThTableCell>金</ThTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* itemIndexが 時間 -1 と対応 */}
            {sortTimeTable(timetable).map((item, itemIndex) => (
              <TableRow key={itemIndex}>
                <ThTableCell component="th" scope="row">
                  {itemIndex + 1}時限目
                </ThTableCell>
                <TdTableCell
                  //   授業登録済みのコマは授業ID,曜日,時間を持つが、未登録のコマは授業ID.曜日,時間を持たないため
                  //   授業ID⇒すべて（-1）、曜日⇒表示位置、時間⇒itemIndex + 1を引数で渡して絞り込み条件を設定する
                  onClick={() => {
                    handleClickLecture(
                      item.monday.lecture_id ?? CONSTANT.LECTURE_ID.ALL.value,
                      CONSTANT.DAY_OF_WEEk.MONDAY.value,
                      item.monday.time ?? itemIndex + 1,
                      selectedPeriod
                    );
                  }}
                >
                  <div>{item.monday.lecture_name}</div>
                </TdTableCell>
                <TdTableCell
                  //   授業登録済みのコマは授業ID,曜日,時間を持つが、未登録のコマは授業ID.曜日,時間を持たないため
                  //   授業ID⇒すべて（-1）、曜日⇒表示位置、時間⇒itemIndex + 1を引数で渡して絞り込み条件を設定する
                  onClick={() => {
                    handleClickLecture(
                      item.tuesday.lecture_id ?? CONSTANT.LECTURE_ID.ALL.value,
                      CONSTANT.DAY_OF_WEEk.TUESDAY.value,
                      item.tuesday.time ?? itemIndex + 1,
                      selectedPeriod
                    );
                  }}
                >
                  <div>{item.tuesday.lecture_name}</div>
                </TdTableCell>
                <TdTableCell
                  //   授業登録済みのコマは授業ID,曜日,時間を持つが、未登録のコマは授業ID.曜日,時間を持たないため
                  //   授業ID⇒すべて（-1）、曜日⇒表示位置、時間⇒itemIndex + 1を引数で渡して絞り込み条件を設定する
                  onClick={() => {
                    handleClickLecture(
                      item.wednesday.lecture_id ??
                        CONSTANT.LECTURE_ID.ALL.value,
                      CONSTANT.DAY_OF_WEEk.WEDNESDAY.value,
                      item.wednesday.time ?? itemIndex + 1,
                      selectedPeriod
                    );
                  }}
                >
                  <div>{item.wednesday.lecture_name}</div>
                </TdTableCell>
                <TdTableCell
                  //   授業登録済みのコマは授業ID,曜日,時間を持つが、未登録のコマは授業ID.曜日,時間を持たないため
                  //   授業ID⇒すべて（-1）、曜日⇒表示位置、時間⇒itemIndex + 1を引数で渡して絞り込み条件を設定する
                  onClick={() => {
                    handleClickLecture(
                      item.thursday.lecture_id ?? CONSTANT.LECTURE_ID.ALL.value,
                      CONSTANT.DAY_OF_WEEk.THURSDAY.value,
                      item.thursday.time ?? itemIndex + 1,
                      selectedPeriod
                    );
                  }}
                >
                  <div>{item.thursday.lecture_name}</div>
                </TdTableCell>
                <TdTableCell
                  //   授業登録済みのコマは授業ID,曜日,時間を持つが、未登録のコマは授業ID.曜日,時間を持たないため
                  //   授業ID⇒すべて（-1）、曜日⇒表示位置、時間⇒itemIndex + 1を引数で渡して絞り込み条件を設定する
                  onClick={() => {
                    handleClickLecture(
                      item.friday.lecture_id ?? CONSTANT.LECTURE_ID.ALL.value,
                      CONSTANT.DAY_OF_WEEk.FRIDAY.value,
                      item.friday.time ?? itemIndex + 1,
                      selectedPeriod
                    );
                  }}
                >
                  <div>{item.friday.lecture_name}</div>
                </TdTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const timetableContainer = css`
  padding: 0.5rem 3rem;
`;

const tableTitleContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const selectContainer = css`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;
`;

/**
 * thのセル用にTableCellをラップ
 */
const ThTableCell = styled(TableCell)`
  color: #696969;
  font-weight: bold;
  text-align: center;
  border-right: 1px solid #e0e0e0;
`;

/**
 * tdのセル用にTableCellをラップ
 */
const TdTableCell = styled(TableCell)`
  color: #696969;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  border-right: 1px solid #e0e0e0;
  :hover {
    background-color: #bce2e8;
  }
  padding: 1rem;
  height: 70px;
  width: 160px;

  /* 動的に文字数が変わるため、2行を超える場合の3点リーダ設定 */
  div {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

export default UserTimetable;
