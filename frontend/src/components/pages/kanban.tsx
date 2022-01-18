import { Flex } from "@chakra-ui/react";
import { Category } from "../../types/category";
import Board from "../organisms/board";

type KanbanProps = {
  categorys: Array<Category>;
  handlers: {
    handleCreateCard: () => void;
    handleDeleteCard: (cardId: number) => void;
  };
};

const Kanban: React.FC<KanbanProps> = ({ categorys, ...props }) => {
  return (
    <Flex>
      {categorys.map((category: Category, index: number) => {
        return (
          <Board
            key={index}
            title={category.categoryName}
            cards={category.cards}
            categoryId={category.categoryId}
            {...props}
          />
        );
      })}
    </Flex>
  );
};

export default Kanban;
