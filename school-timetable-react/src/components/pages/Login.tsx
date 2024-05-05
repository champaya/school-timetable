/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import useGetAPI from "../../api/useGetAPI";
import { CONSTANT } from "../../consts/constant";
import { useDispatch } from "react-redux";
import { setAuthResult } from "../../redux/slice/AuthSlice";
import { useNavigate } from "react-router-dom";

/** ログインページ */
const Login = () => {
  const [studentNumber, setStudentNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const getAPI = useGetAPI();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * 「ログインする」ボタン押下時に発火
   */
  const handleClickLogin = async () => {
    // get - users
    const authResult = await getAPI(CONSTANT.API.USERS, studentNumber, {
      password,
    });
    // 認証情報をReduxで管理
    dispatch(setAuthResult(authResult));
    // 時間割ページに遷移する
    navigate(CONSTANT.ROUTE.USER_TIMETABLE);
  };

  return (
    <form>
      <div css={loginContainer}>
        <h2>ログイン</h2>
        <TextField
          label="学籍番号"
          variant="standard"
          onChange={(e) => {
            setStudentNumber(e.target.value);
          }}
        />
        <TextField
          label="パスワード"
          variant="standard"
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

  h2 {
    margin: 0;
  }
`;

export default Login;
