import axios, { AxiosResponse, AxiosError } from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { CONSTANT } from "../consts/constant";
import { startLoading, finishLoading } from "../redux/slice/LoadingSlice";

/** API - get */
const useGetAPI = () => {
  const dispatch = useDispatch();

  // @todo any以外で適切な型定義ができないか
  const getFunc = useCallback(
    async (url: string, id?: string | number, params?: any) => {
      // ローディングを表示
      dispatch(startLoading());

      return axios
        .get(`${CONSTANT.API.BASE}${url}${id}`, { params })
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

  return getFunc;
};

export default useGetAPI;
