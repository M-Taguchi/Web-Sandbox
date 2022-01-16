import { Flex } from "@chakra-ui/react";
import Board from "./board";

type KanbanProps = {
  categorys: any;
};

const Kanban: React.FC<KanbanProps> = ({ categorys }) => {
  return (
    <Flex>
      {categorys.map((category: any, index: number) => {
        return <Board key={index} title={category.categoryName} />;
      })}
    </Flex>
  );
};

export default Kanban;
