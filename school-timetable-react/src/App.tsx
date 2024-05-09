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
import Login from "./components/pages/Login";
import Loading from "./components/share/Loading";
import { wrappedUseSelector } from "./redux/store/store";
import UserTimetable from "./components/pages/UserTimetable";
import Lectures from "./components/pages/Lectures/Lectures";

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
      { path: CONSTANT.ROUTE.USER_TIMETABLE, element: <UserTimetable /> },
      { path: CONSTANT.ROUTE.LECTURES, element: <Lectures /> },
    ],
  },
]);

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
