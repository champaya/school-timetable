import { Modal, Box } from "@mui/material";
import { wrappedUseSelector } from "../../redux/store/store";
import { useDispatch } from "react-redux";
import { closeErrorModal } from "../../redux/slice/ErrorModalSlice";

/** エラーモーダル */
const ErrorModal = () => {
  const error = wrappedUseSelector((state) => state.errorModal);
  const dispatch = useDispatch();
  /** モーダルクローズ */
  const handleClose = () => dispatch(closeErrorModal(""));

  return (
    <div>
      <Modal open={error.open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            overflow: "scroll",
            bgcolor: "background.paper",
            border: "2px solid #f55",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h1>エラー</h1>
          <p>{error.message}</p>
        </Box>
      </Modal>
    </div>
  );
};

export default ErrorModal;
