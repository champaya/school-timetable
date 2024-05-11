import axios, { AxiosResponse, AxiosError } from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { CONSTANT } from "../consts/constant";
import { startLoading, finishLoading } from "../redux/slice/LoadingSlice";
import Cookies from "js-cookie";

/** API - put */
const usePutAPI = () => {
  const dispatch = useDispatch();

  // @todo any以外で適切な型定義ができないか
  const putFunc = useCallback(
    async (
      url: string,
      authParamFlg: boolean,
      id?: string | number,
      params?: any
    ) => {
      // ローディングを表示
      dispatch(startLoading());

      // パラメータに認証情報を付与
      if (authParamFlg) {
        params = {
          ...params,
          ...{
            uid: Cookies.get("_uid"),
            client: Cookies.get("_client"),
            "access-token": Cookies.get("_access-token"),
          },
        };
      }

      // @todo パラメータの構造がここだけ違う
      return axios
        .put(`${CONSTANT.API.BASE}${url}` + (id ?? ""), params)
        .then((response: AxiosResponse) => {
          // ローディングを非表示
          dispatch(finishLoading());
          return response;
        })
        .catch((error: AxiosError) => {
          // ローディングを非表示
          dispatch(finishLoading());

          throw error;
        });
    },
    [dispatch]
  );

  return putFunc;
};

export default usePutAPI;
