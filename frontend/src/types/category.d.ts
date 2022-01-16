import { CardProps } from "./card";

export interface Category {
  categoryId: number;
  categoryName: string;
  cards: Array<CardProps>;
}

export interface CategoryResponse extends BaseResponse {
  category: Object<Category>;
}
