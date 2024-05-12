/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Modal, Box } from "@mui/material";
import { useState } from "react";
import convertPeriod from "../../../utils/convertPeriod";
import convertDayOfWeek from "../../../utils/convertDayOfWeek";
import convertTime from "../../../utils/convertTime";
import { LecturesDetailModalProps } from "./LecturesDetailModal.model";
import styled from "@emotion/styled";

/** 授業詳細モーダル */
const LecturesDetailModal = ({
  lecture_name,
  credit_count,
  day_of_week,
  time,
  period,
  teacher_name,
  lecture_overview,
}: LecturesDetailModalProps) => {
  const [open, setOpen] = useState(false);
  /** モーダルオープン */
  const handleOpen = () => setOpen(true);
  /** モーダルクローズ */
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        授業詳細
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            maxHeight: "90%",
            overflow: "scroll",
            bgcolor: "background.paper",
            border: "2px solid #696969",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div css={titleContainer}>
            <h1>{lecture_name}</h1>
            <div>
              曜日{"　　 "}：{convertDayOfWeek(day_of_week)}
              <br />
              時間{"　　 "}：{convertTime(time)}
              <br />
              前期/後期：{convertPeriod(period)}
              <br />
              単位数{"　 "}：{credit_count}
              <br />
              担当教員 ：{teacher_name}
            </div>
          </div>
          <CustomeH2>授業概要</CustomeH2>
          <div css={overview}>{lecture_overview}</div>
        </Box>
      </Modal>
    </div>
  );
};

const titleContainer = css`
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 2.3rem;
    margin: 0;
    max-width: 60%;
  }

  div {
    margin-top: 0.5rem;
  }
`;

const CustomeH2 = styled("h2")`
  margin: 0;
`;

const overview = css`
  white-space: pre-wrap;
`;

export default LecturesDetailModal;
