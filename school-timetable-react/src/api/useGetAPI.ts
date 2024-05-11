import axios, { AxiosResponse, AxiosError } from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { CONSTANT } from "../consts/constant";
import { startLoading, finishLoading } from "../redux/slice/LoadingSlice";
import Cookies from "js-cookie";

/** API - get */
const useGetAPI = () => {
  const dispatch = useDispatch();

  // axiosのリクエストボディに入る型は結局anyのため、引数「params」のみanyを許容する（オブジェクトであることは最低限保証するように型付けする）
  const getFunc = useCallback(
    async (
      url: string,
      authParamFlg: boolean,
      id?: string | number,
      params?: { [key: string]: any }
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

      return axios
        .get(`${CONSTANT.API.BASE}${url}` + (id ?? ""), { params })
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
