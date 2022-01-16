import { Flex } from "@chakra-ui/react";
import { Category } from "../../types/category";
import Board from "../organisms/board";

type KanbanProps = {
  categorys: Array<Category>;
};

const Kanban: React.FC<KanbanProps> = ({ categorys }) => {
  return (
    <Flex>
      {categorys.map((category: Category, index: number) => {
        return (
          <Board
            key={index}
            title={category.categoryName}
            cards={category.cards}
          />
        );
      })}
    </Flex>
  );
};

export default Kanban;
