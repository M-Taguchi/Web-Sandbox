
export interface User {
  id: number;
  name: string;
};

export interface UserResponse extends BaseResponse {
  user: Object<User>
};