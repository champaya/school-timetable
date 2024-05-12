/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";
import {
  Outlet,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
} from "react-router-dom";
import { CONSTANT } from "./consts/constant";
import { CssBaseline } from "@mui/material";
import Login from "./components/pages/Login/Login";
import Loading from "./components/share/Loading";
import { wrappedUseSelector } from "./redux/store/store";
import UserTimetable from "./components/pages/UserTimetable/UserTimetable";
import Lectures from "./components/pages/Lectures/Lectures";
import ResetPassword from "./components/pages/ResetPassword/ResetPassword";
import ChangePassword from "./components/pages/ChangePassword/ChangePassword";
import Header from "./components/share/Header";

const App = () => {
  const loading = wrappedUseSelector((state) => state.loading);
  return (
    <>
      <CssBaseline />
      <Global styles={globalCSS} />
      <div css={appContainer}>
        {loading && <Loading />}
        <RouterProvider router={router} />
      </div>
    </>
  );
};

/**
 * ルーティング設定
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollRestoration />
        <Outlet />
      </>
    ),
    children: [
      { path: CONSTANT.ROUTE.DEFAULT, element: <Login /> },
      {
        path: CONSTANT.ROUTE.USER_TIMETABLE,
        element: (
          <>
            <Header />
            <UserTimetable />
          </>
        ),
      },
      {
        path: CONSTANT.ROUTE.LECTURES,
        element: (
          <>
            <Header />
            <Lectures />
          </>
        ),
      },
      {
        path: CONSTANT.ROUTE.RESET_PASSWORD,
        element: (
          <>
            <Header />
            <ResetPassword />
          </>
        ),
      },
      {
        path: CONSTANT.ROUTE.CHANGE_PASSWORD,
        element: (
          <>
            <Header />
            <ChangePassword />
          </>
        ),
      },
    ],
  },
]);

const globalCSS = css`
  /* スクロールバーのスタイル */
  ::-webkit-scrollbar {
    width: 0.8rem;
    border-radius: 1rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 1rem;
  }

  body {
    margin: 0;
    color: #696969 !important ;
  }
`;

const appContainer = css`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

export default App;
