import axios, { AxiosResponse } from "axios";
import { createContext, useContext } from "react";
import { BaseResponse } from "../types/internalApi";
import { useAuth } from "./useAuth";

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

// get時のsuspend用
let status = "pending";
let result: Object;
let error: Error;

// TODO: 以下のaxiosの設定を環境変数に変更
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000/api";

export const ApiProvider: React.FC = ({ children }) => {
  const { jwtCsrf } = useAuth();

  const _get = (url: string, params?: object) => {
    const suspender = axios
      .get(url, { params: params })
      .then((r: AxiosResponse<BaseResponse>) => {
        status = r.data.status;
        result = r.data.body;
      })
      .catch((e: any) => {
        status = "error";
        error = e;
      });

    return {
      read() {
        if (status === "pending") {
          throw suspender;
        } else if (status === "error") {
          throw error;
        }
        return [status, result];
      },
    };
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
        throw error;
      });

    // if (response.data.code !== 200) {
    //   console.log("エラー");
    //   throw error;
    // }

    return [response.data.status, response.data.body];
  };

  const _delete = async (url: string, data?: object) => {
    const response = await axios
      .delete<BaseResponse>(url, { data: data })
      .catch((e: any) => {
        console.log("エラー");
        throw error;
      });

    // if (response.data.code !== 200) {
    //   console.log("エラー");
    //   throw error;
    // }

    return [response.data.status, response.data.body];
  };

  return (
    <apiContext.Provider value={{ _post, _get, _delete }}>
      {children}
    </apiContext.Provider>
  );
};

export const useInternalApi = () => useContext(apiContext);
