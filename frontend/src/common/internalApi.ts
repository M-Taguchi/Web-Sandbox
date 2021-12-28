import axios, { AxiosResponse } from "axios";
import { BaseResponse } from "../types/internalApi";

let status = "pending";
let result: Object;
let error: Error;

axios.defaults.withCredentials = true;

export const _get = (url: string, params?: object) => {
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

export const _post = async (url: string, data: object, addHeaders?: object) => {
  const response = await axios
    .post<BaseResponse>(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...addHeaders,
      },
    })
    .catch((e: any) => {
      console.log("エラー");
      throw error;
    });

  if (response.data.code !== 200) {
    console.log("エラー");
    throw error;
  }

  return [response.data.status, response.data.body];
};
