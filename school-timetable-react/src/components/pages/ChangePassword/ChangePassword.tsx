/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { CONSTANT } from "../../../consts/constant";
import usePutAPI from "../../../api/usePutAPI";
import { useNavigate } from "react-router-dom";

/** パスワード変更ページ */
const ChangePassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const put = usePutAPI();

  const navigate = useNavigate();

  /**
   * 「パスワード変更」ボタン押下時に発火
   */
  const handleClickReset = () => {
    put(`${CONSTANT.API.Auth}${CONSTANT.API.PASSWORD}`, true, undefined, {
      password,
      password_confirmation: confirmPassword,
      reset_password_token: new URL(
        decodeURIComponent(document.location.href)
      ).searchParams.get("token"),
    })
      .then(() => {
        setMessage(
          "パスワードを変更しました。下部のボタンを押下してログインページに戻ってください。"
        );
        setIsChanged(true);
      })
      .catch(() => {
        setMessage(
          "パスワードの変更に失敗しました。ログインをしていない場合は先にログインをしてください。"
        );
      });
  };

  return (
    <form>
      <div css={changePasswordContainer}>
        <h2>パスワードの再設定</h2>
        <TextField
          label="パスワード"
          variant="standard"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          label="パスワード確認用"
          variant="standard"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <Button onClick={handleClickReset}>パスワード再設定</Button>
        <p>{message}</p>
        {isChanged && (
          <Button
            onClick={() => {
              navigate(CONSTANT.ROUTE.DEFAULT);
            }}
          >
            ログインページに戻る
          </Button>
        )}
      </div>
    </form>
  );
};

const changePasswordContainer = css`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: grid;
  place-content: center;
  gap: 0.5rem;

  h2 {
    margin: 0;
  }

  p {
    color: #f55;
  }
`;

export default ChangePassword;
