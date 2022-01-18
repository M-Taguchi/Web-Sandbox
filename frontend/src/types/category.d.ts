import { CardProps } from "./card";

export interface Category {
  kanban: SetStateAction<undefined>;
  categoryId: number;
  categoryName: string;
  cards: Array<CardProps>;
}

export interface CategoryResponse extends BaseResponse {
  category: Object<Category>;
}
