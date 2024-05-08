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

const LecturesFilterModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filterLecture = wrappedUseSelector((state) => state.filterLecture);
  const dispatch = useDispatch();

  const dayOfWeekArray = [
    CONSTANT.DAY_OF_WEEk.MONDAY,
    CONSTANT.DAY_OF_WEEk.TUESDAY,
    CONSTANT.DAY_OF_WEEk.WEDNESDAY,
    CONSTANT.DAY_OF_WEEk.THURSDAY,
    CONSTANT.DAY_OF_WEEk.FRIDAY,
  ];

  const timeArray = [
    CONSTANT.TIME.FIRST_CLASS,
    CONSTANT.TIME.SECOND_CLASS,
    CONSTANT.TIME.THIRD_CLASS,
    CONSTANT.TIME.FOURTH_CLASS,
    CONSTANT.TIME.FIFTH_CLASS,
  ];

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
              defaultValue={
                filterLecture.lecture_id !== -1 ? filterLecture.lecture_id : ""
              }
              onChange={(e) => {
                dispatch(
                  setFilterCondition({
                    day_of_week: filterLecture.day_of_week,
                    lecture_id:
                      e.target.value !== ""
                        ? Number.parseInt(e.target.value)
                        : -1,
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
                  value={String(-1)}
                  control={<Radio />}
                  label="すべて"
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
                  value={String(-1)}
                  control={<Radio />}
                  label="すべて"
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
                  value={String(-1)}
                  control={<Radio />}
                  label="すべて"
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

// @todo 分割
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
