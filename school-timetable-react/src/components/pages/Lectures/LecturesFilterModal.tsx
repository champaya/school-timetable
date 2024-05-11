import {
  Button,
  Modal,
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { wrappedUseSelector } from "../../../redux/store/store";
import { useDispatch } from "react-redux";
import {
  resetFilterCondition,
  setFilterCondition,
} from "../../../redux/slice/FilterLectureSlice";
import { CONSTANT } from "../../../consts/constant";

/** 授業絞り込みモーダル */
const LecturesFilterModal = () => {
  const [open, setOpen] = useState(false);
  /** モーダルオープン */
  const handleOpen = () => setOpen(true);
  /** モーダルクローズ */
  const handleClose = () => setOpen(false);

  const filterLecture = wrappedUseSelector((state) => state.filterLecture);
  const dispatch = useDispatch();

  // 曜日表示用の配列
  const dayOfWeekArray = [
    CONSTANT.DAY_OF_WEEk.MONDAY,
    CONSTANT.DAY_OF_WEEk.TUESDAY,
    CONSTANT.DAY_OF_WEEk.WEDNESDAY,
    CONSTANT.DAY_OF_WEEk.THURSDAY,
    CONSTANT.DAY_OF_WEEk.FRIDAY,
  ];
  // 時間表示用の配列
  const timeArray = [
    CONSTANT.TIME.FIRST_CLASS,
    CONSTANT.TIME.SECOND_CLASS,
    CONSTANT.TIME.THIRD_CLASS,
    CONSTANT.TIME.FOURTH_CLASS,
    CONSTANT.TIME.FIFTH_CLASS,
  ];
  // 期間表示用の配列
  const periodArray = [CONSTANT.PERIOD.EARLY, CONSTANT.PERIOD.LATE];

  return (
    <div>
      <Button onClick={handleOpen}>絞り込み</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            絞り込み条件
          </Typography>
          <Typography sx={{ mt: 2 }}>
            授業ID
            <TextField
              label="授業ID"
              variant="standard"
              // 授業IDが-1(すべて)の場合は空文字に変換する
              defaultValue={
                filterLecture.lecture_id !== CONSTANT.LECTURE_ID.ALL.value
                  ? filterLecture.lecture_id
                  : CONSTANT.LECTURE_ID.ALL.label
              }
              onChange={(e) => {
                // 授業IDが空文字の場合は-1(すべて)に変換する
                dispatch(
                  setFilterCondition({
                    day_of_week: filterLecture.day_of_week,
                    lecture_id:
                      e.target.value !== CONSTANT.LECTURE_ID.ALL.label
                        ? Number.parseInt(e.target.value)
                        : CONSTANT.LECTURE_ID.ALL.value,
                    period: filterLecture.period,
                    time: filterLecture.time,
                  })
                );
              }}
            />
            <FormControl>
              曜日
              <RadioGroup
                row
                name="controlled-radio-day-of-week"
                value={filterLecture.day_of_week}
                onChange={(e) => {
                  dispatch(
                    setFilterCondition({
                      day_of_week: Number.parseInt(e.target.value),
                      lecture_id: filterLecture.lecture_id,
                      period: filterLecture.period,
                      time: filterLecture.time,
                    })
                  );
                }}
              >
                <FormControlLabel
                  value={String(CONSTANT.DAY_OF_WEEk.ALL.value)}
                  control={<Radio />}
                  label={CONSTANT.DAY_OF_WEEk.ALL.label}
                />
                {dayOfWeekArray.map((day_of_week, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={String(day_of_week.value)}
                      control={<Radio />}
                      label={day_of_week.label}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
            <FormControl>
              時間
              <RadioGroup
                row
                name="controlled-radio-time"
                value={filterLecture.time}
                onChange={(e) => {
                  dispatch(
                    setFilterCondition({
                      day_of_week: filterLecture.day_of_week,
                      lecture_id: filterLecture.lecture_id,
                      period: filterLecture.period,
                      time: Number.parseInt(e.target.value),
                    })
                  );
                }}
              >
                <FormControlLabel
                  value={String(CONSTANT.TIME.ALL.value)}
                  control={<Radio />}
                  label={CONSTANT.TIME.ALL.label}
                />
                {timeArray.map((time, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={String(time.value)}
                      control={<Radio />}
                      label={time.label}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
            <FormControl>
              前期/後期
              <RadioGroup
                row
                name="controlled-radio-period"
                value={String(filterLecture.period)}
                onChange={(e) => {
                  dispatch(
                    setFilterCondition({
                      day_of_week: filterLecture.day_of_week,
                      lecture_id: filterLecture.lecture_id,
                      period: Number.parseInt(e.target.value),
                      time: filterLecture.time,
                    })
                  );
                }}
              >
                <FormControlLabel
                  value={String(CONSTANT.PERIOD.ALL.value)}
                  control={<Radio />}
                  label={CONSTANT.PERIOD.ALL.label}
                />
                {periodArray.map((period, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={period.value}
                      control={<Radio />}
                      label={period.label}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
            <Button onClick={() => dispatch(resetFilterCondition())}>
              絞り込み条件をクリア
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default LecturesFilterModal;
