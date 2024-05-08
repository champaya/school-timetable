import axios, { AxiosResponse, AxiosError } from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { CONSTANT } from "../consts/constant";
import { startLoading, finishLoading } from "../redux/slice/LoadingSlice";

/** API - post */
const usePostAPI = () => {
  const dispatch = useDispatch();

  // @todo any以外で適切な型定義ができないか
  const postFunc = useCallback(
    async (url: string, id?: string | number, params?: any) => {
      // ローディングを表示
      dispatch(startLoading());

      // @todo パラメータの構造がここだけ違う
      return axios
        .post(`${CONSTANT.API.BASE}${url}` + (id ?? ""), params)
        .then((response: AxiosResponse) => {
          // ローディングを非表示
          dispatch(finishLoading());
          return response.data.data;
        })
        .catch((error: AxiosError) => {
          // ローディングを非表示
          dispatch(finishLoading());

          throw error;
        });
    },
    [dispatch]
  );

  return postFunc;
};

export default usePostAPI;
