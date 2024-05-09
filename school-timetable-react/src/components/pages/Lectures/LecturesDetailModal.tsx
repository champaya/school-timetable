import { Button, Modal, Box, Typography } from "@mui/material";
import { useState } from "react";
import { GetLecture } from "./Lectures.model";
import convertPeriod from "../../../utils/convertPeriod";
import convertDayOfWeek from "../../../utils/convertDayOfWeek";
import convertTime from "../../../utils/convertTime";

/** 授業詳細モーダル */
const LecturesDetailModal = ({
  lecture_id,
  lecture_name,
  credit_count,
  day_of_week,
  time,
  period,
  teacher_name,
  lecture_overview,
  teacher_id,
}: GetLecture) => {
  const [open, setOpen] = useState(false);
  /** モーダルオープン */
  const handleOpen = () => setOpen(true);
  /** モーダルクローズ */
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>授業詳細</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style1}>
          <Typography variant="h6" component="h2">
            <h1>
              授業名：{lecture_name}（{lecture_id}）
            </h1>
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <div>
              曜日：{convertDayOfWeek(day_of_week)},時間：{convertTime(time)}
              ,前期/後期：{convertPeriod(period)},単位数：
              {credit_count},担当教員：{teacher_name}（{teacher_id}）
            </div>
            <div>授業概要</div>
            <div>{lecture_overview}</div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default LecturesDetailModal;
