
export interface User {
  userName: string;
  message: string;
};

export interface UserResponse extends BaseResponse {
  user: Object<User>
};