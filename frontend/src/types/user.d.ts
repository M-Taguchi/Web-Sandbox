export interface User {
  userId: number;
  userName: string;
}

export interface UserResponse extends BaseResponse {
  user: Object<User>;
}
