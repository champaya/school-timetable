/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { CONSTANT } from "../../../consts/constant";
import usePostAPI from "../../../api/usePostAPI";

/** パスワード変更用メール送付ページ */
const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const post = usePostAPI();

  /**
   * 「パスワード変更」ボタン押下時に発火
   */
  const handleClickReset = () => {
    post(
      `${CONSTANT.API.Auth}${CONSTANT.API.PASSWORD}`,
      false,
      CONSTANT.ERROR_MESSAGE.AUTH_PASSWORD_POST,
      undefined,
      {
        email,
        redirect_url: `${CONSTANT.ROUTE.DOMAIN}${CONSTANT.ROUTE.CHANGE_PASSWORD}`,
      }
    ).then(() => {
      setMessage("メールを送付しました。ご確認ください。");
    });
  };

  return (
    <form>
      <div css={resetPasswordContainer}>
        <h2>パスワード変更</h2>
        <p>
          emailを入力後、パスワード変更ボタンを押下してください。
          <br />
          入力していただいたメールアドレスに、パスワード変更用のメールをお送りいたします。
        </p>
        <TextField
          label="email"
          variant="standard"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button variant="contained" onClick={handleClickReset}>
          パスワード変更
        </Button>
        <p>{message}</p>
      </div>
    </form>
  );
};

const resetPasswordContainer = css`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: grid;
  place-content: center;
  gap: 0.5rem;

  h2 {
    margin: 0;
  }

  p:last-child {
    color: #f55;
  }
`;

export default ResetPassword;
