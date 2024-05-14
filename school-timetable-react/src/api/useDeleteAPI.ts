import axios, { AxiosResponse, AxiosError } from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { CONSTANT } from "../consts/constant";
import { startLoading, finishLoading } from "../redux/slice/LoadingSlice";
import Cookies from "js-cookie";
import { openErrorModal } from "../redux/slice/ErrorModalSlice";

/** API - delete */
const useDeleteAPI = () => {
  const dispatch = useDispatch();

  // axiosのリクエストボディに入る型は結局anyのため、引数「params」のみanyを許容する（オブジェクトであることは最低限保証するように型付けする）
  const deleteFunc = useCallback(
    (
      url: string,
      authParamFlg: boolean,
      errorMessage: string,
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
            uid: Cookies.get(CONSTANT.COOKIES.UID),
            client: Cookies.get(CONSTANT.COOKIES.CLIENT),
            "access-token": Cookies.get(CONSTANT.COOKIES.ACCESS_TOKEN),
          },
        };
      }

      return axios
        .delete(`${CONSTANT.API.BASE}${url}` + (id ? `/${id}` : ""), { params })
        .then((response: AxiosResponse) => {
          // ローディングを非表示
          dispatch(finishLoading());
          return response;
        })
        .catch((error: AxiosError) => {
          // ローディングを非表示
          dispatch(finishLoading());

          // code:450のみカスタムの例外処理とする
          if (error.response?.status === CONSTANT.ERROR_CODE.OPERATION_OTHERS) {
            // エラーモーダルを表示
            dispatch(openErrorModal(CONSTANT.ERROR_MESSAGE.CUSTOME_ERROR_450));
          } else {
            // エラーモーダルを表示
            dispatch(openErrorModal(errorMessage));
          }

          throw error;
        });
    },
    [dispatch]
  );

  return deleteFunc;
};

export default useDeleteAPI;
