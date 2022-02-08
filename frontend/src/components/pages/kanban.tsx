import { Flex } from "@chakra-ui/react";
import { Category } from "../../types/category";
import Board from "../organisms/board";
import NewBoard from "../organisms/newBoard";

type KanbanProps = {
  categorys: Array<Category>;
  handlers: {
    handleCreateCard: () => void;
    handleDeleteCard: (cardId: number) => void;
    handleDeleteCategory: (boardId: number) => void;
    handleCreateCategory: () => void;
  };
};

const Kanban: React.FC<KanbanProps> = ({ categorys, handlers, ...props }) => {
  return (
    <Flex>
      {categorys.map((category: Category, index: number) => {
        return (
          <Board
            key={index}
            title={category.categoryName}
            cards={category.cards}
            categoryId={category.categoryId}
            handlers={handlers}
            {...props}
          />
        );
      })}
      <NewBoard handlers={handlers} />
    </Flex>
  );
};

export default Kanban;
