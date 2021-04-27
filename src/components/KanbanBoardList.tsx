import React from 'react'
import KanbanBoardTodo from "./KanbanBoard/KanbanBoardTodo";
import KanbanBoardTable from "./KanbanBoard/KanbanBoardTable";

const KanbanBoardList: React.FC = () => {
    return (
        <div>
            <KanbanBoardTodo/>
            <KanbanBoardTable/>
        </div>
    );
};

export default KanbanBoardList;
