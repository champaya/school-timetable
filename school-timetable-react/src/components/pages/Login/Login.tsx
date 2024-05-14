/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { CONSTANT } from "../../../consts/constant";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import usePostAPI from "../../../api/usePostAPI";

/** ログインページ */
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const post = usePostAPI();
  const navigate = useNavigate();

  /**
   * 「ログインする」ボタン押下時に発火
   */
  const handleClickLogin = () => {
    // サインイン
    post(
      CONSTANT.API.SIGN_IN,
      false,
      CONSTANT.ERROR_MESSAGE.AUTH_SIGN_IN_POST,
      undefined,
      {
        email,
        password,
      }
    ).then(
      (
        response: AxiosResponse<
          {
            data: {
              email: string;
              provider: string;
              uid: string;
              id: number;
              allow_password_change: boolean;
              name: string;
              nickname: string;
              image: string;
            };
          },
          {
            uid: string;
            client: string;
            "access-token": string;
          }
        >
      ) => {
        // cookieに認証情報を保存
        Cookies.set(CONSTANT.COOKIES.UID, response.headers.uid, {
          expires: 1,
        });
        Cookies.set(CONSTANT.COOKIES.CLIENT, response.headers.client, {
          expires: 1,
        });
        Cookies.set(
          CONSTANT.COOKIES.ACCESS_TOKEN,
          response.headers["access-token"],
          {
            expires: 1,
          }
        );
        Cookies.set(CONSTANT.COOKIES.ID, String(response.data.data.id), {
          expires: 1,
        });
        // 時間割ページに遷移する
        navigate(CONSTANT.ROUTE.USER_TIMETABLE);
      }
    );
  };

  return (
    <form>
      <div css={loginContainer}>
        <h1>ログイン</h1>
        <TextField
          label="email"
          variant="standard"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          label="パスワード"
          variant="standard"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button variant="contained" onClick={handleClickLogin}>
          ログインする
        </Button>
      </div>
    </form>
  );
};

const loginContainer = css`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: grid;
  place-content: center;
  gap: 0.5rem;

  h1 {
    margin: 0;
  }

  button {
    margin-top: 1rem;
  }

  p {
    color: #f55;
  }
`;

export default Login;
