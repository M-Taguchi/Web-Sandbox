import axios, { AxiosResponse } from "axios"

type BaseResponse = {
  status: String;
  body: object;
}

const ErrorResponse = {
  status: "error",
  body: {},
}

export const _get = async(url: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (e: any) {
    if (e.response && e.response.status === 400) {
      console.log("400 Error!!");
    }
  }
};