export interface CardProps {
  cardId: number;
  cardTitle: string;
  cardContent: string;
  categoryId: number;
}

export interface CardResponse extends BaseResponse {
  card: Object<CardProps>;
}
