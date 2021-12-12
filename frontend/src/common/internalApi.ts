import axios, { AxiosResponse } from "axios"
import { BaseResponse } from "../types/internalApi"

let status = "pending";
let result: Object;
let error: Error;

export const _get = (url: string, params?: object) => {
  const suspender = axios.get(url, {params: params}).then((r: AxiosResponse<BaseResponse>) =>{
    status = r.data.status;
    result = r.data.body;
  })
  .catch((e: any) => {
    status = "error";
    error = e;
  })

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw error;
      }
      return result;
    }
  }
};

export const _post = async(url: string, data: object) => {
  const response = await axios.post<BaseResponse>(url, {
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });

  if (response.status !== 200) {
    console.log("エラー");
    throw error;
  }

  return response.data.body;
};