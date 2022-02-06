import axios, { AxiosResponse } from "axios";
import { createContext, useContext } from "react";
import { BaseResponse } from "../types/internalApi";
import { useAuth } from "./useAuth";
import useSWR from "swr";

type ApiContext = {
  // TODO: any修正
  _post: (url: string, data?: object, addHeaders?: object) => any;
  _get: (url: string, params?: object) => any;
  _delete: (url: string, data?: object) => any;
};

const defaultContext: ApiContext = {
  _post: () => [],
  _get: () => [],
  _delete: () => [],
};

const apiContext = createContext<ApiContext>(defaultContext);

// TODO: 以下のaxiosの設定を環境変数に変更
if (process.env.NODE_ENV === "development") {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = process.env.REACT_APP_DEV_API_URL;
} else {
  axios.defaults.withCredentials = false;
  axios.defaults.baseURL = process.env.REACT_APP_PROD_API_URL;
}

export const ApiProvider: React.FC = ({ children }) => {
  const { jwtCsrf } = useAuth();

  const _get = (url: string, params?: object) => {
    const fetcher = () =>
      axios.get(url, { params: params, headers: {
        "X-CSRF-TOKEN": jwtCsrf,
      }, }).then((res) => res.data.body);

    //@ts-ignore
    const { data, error, mutate } = useSWR(url, fetcher, { suspense: true });

    if (error) throw error;

    return { data, fetch: mutate };
  };

  const _post = async (url: string, data?: object, addHeaders?: object) => {
    const response = await axios
      .post<BaseResponse>(url, data, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": jwtCsrf,
          ...addHeaders,
        },
      })
      .catch((e: any) => {
        console.log("エラー");
        throw e;
      });

    return response.data.body;
  };

  const _delete = async (url: string, data?: object) => {
    const response = await axios
      .delete<BaseResponse>(url, {
        data: data,
        headers: {
          "X-CSRF-TOKEN": jwtCsrf,
        },
      })
      .catch((e: any) => {
        console.log("エラー");
        throw e;
      });

    return response.data.body;
  };

  return (
    <apiContext.Provider value={{ _post, _get, _delete }}>
      {children}
    </apiContext.Provider>
  );
};

export const useInternalApi = () => useContext(apiContext);
