export interface User {
  id: number;
  userName: string;
}

export interface UserResponse extends BaseResponse {
  user: Object<User>;
}
