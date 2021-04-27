import React, {useState} from 'react';
import {DndProvider, useDrop} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from "react-dnd-touch-backend";
import {COLUMN_NAMES} from "../../constants";
import {useTypedSelector} from "../../hooks/useTypeSelector";
import {fetchTodoList} from "../../store/action-creator/todoList";
import "./kanbanBoardTable.css"
import KanbanBoardItem from "./KanbanBoardItem";


const Column = ({children, className, title}) => {

    const [{isOver, canDrop}, drop] = useDrop({
        accept: 'Our first type',
        drop: () => ({name: title}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item: any) => {
            const {DO_IT, IN_PROGRESS, DONE} = COLUMN_NAMES;
            const {currentColumnName} = item;
            return (currentColumnName === title) ||
                (currentColumnName === DO_IT && title === IN_PROGRESS) ||
                (currentColumnName === IN_PROGRESS && (title === DO_IT || title === DONE)) ||
                (currentColumnName === DONE && title === IN_PROGRESS);
        },
    });

    const getBackgroundColor = () => {
        if (isOver) {
            if (canDrop) {
                return 'rgb(188,251,255)'
            } else if (!canDrop) {
                return 'rgb(255,188,188)'
            }
        } else {
            return '';
        }
    };

    return (
        <div ref={drop} className={className} style={{backgroundColor: getBackgroundColor()}}>
            <p>{title}</p>
            {children}
        </div>
    )
}

export const KanbanBoardTable = () => {

    const {todos} = useTypedSelector((state) => state.todos)

    const [items, setItems] = useState(todos);
    const isMobile = window.innerWidth < 600;

    const moveCardHandler = (dragIndex, hoverIndex) => {
        const dragItem = items[dragIndex];

        if (dragItem) {
            setItems((prevState => {
                const coppiedStateArray = [...prevState];
                const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
                coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
                return coppiedStateArray;
            }));
        }
    };

    const {DO_IT, IN_PROGRESS, DONE} = COLUMN_NAMES;

    const returnItemsForColumn = (columnName) => {
        return (
            <div>
                {todos.length ? (todos.filter((item) => item.column === columnName)
                    .map((item, index) => (
                        <KanbanBoardItem key={item.id}
                                     name={item.title}
                                     currentColumnName={item.column}
                                     setItems={setItems}
                                     index={index}
                                     date={item.date}
                                     moveCardHandler={moveCardHandler}
                        />
                    ))) : (<p className="markUp">Данных нет</p>)}
            </div>
        )
    }

    return (
        <div className="container">
            <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                <Column title={DO_IT} className='column do-it-column'>
                    {returnItemsForColumn(DO_IT)}
                </Column>
                <Column title={IN_PROGRESS} className='column in-progress-column'>
                    {returnItemsForColumn(IN_PROGRESS)}
                </Column>

                <Column title={DONE} className='column done-column'>
                    {returnItemsForColumn(DONE)}
                </Column>
            </DndProvider>
        </div>
    );
}

export default KanbanBoardTable;


/*const MovableItem = ({name, index, currentColumnName, moveCardHandler, setItems}) => {

    const changeItemColumn = (currentItem, columnName) => {
        setItems((prevState) => {
            return prevState.map(e => {
                return {
                    ...e,
                    column: e.name === currentItem.name ? columnName : e.column,
                }
            })
        });
    }

    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'Our first type',
        hover(item: any, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCardHandler(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{isDragging}, drag] = useDrag({
        item: {index, name, currentColumnName, type: 'Our first type'},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();

            if (dropResult) {
                const {name} = dropResult;
                const {DO_IT, IN_PROGRESS, DONE} = COLUMN_NAMES;
                switch (name) {
                    case IN_PROGRESS:
                        changeItemColumn(item, IN_PROGRESS);
                        break;
                    case DONE:
                        changeItemColumn(item, DONE);
                        break;
                    case DO_IT:
                        changeItemColumn(item, DO_IT);
                        break;
                    default:
                        break;
                }
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    drag(drop(ref));

    return (
        <div ref={ref} className='movable-item' style={{opacity}}>
            {name}
        </div>
    )
}*/


/*


import React, {useEffect} from 'react'
import './kanbanBoardTable.css'
import KanbanBoardItem from "./KanbanBoardItem";
import {useTypedSelector} from "../../hooks/useTypeSelector";
import {useDispatch} from "react-redux";
import {fetchTodoList} from "../../store/action-creator/todoList";

const KanbanBoardTable = () => {
    const {todos} = useTypedSelector(state => state.todos);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodoList())
    }, [])

    return (
        <table className="table">
            <thead>
            <tr>
                <td>ToDo</td>
                <td>In Progress</td>
                <td>Done</td>
            </tr>
            </thead>
            <tbody id="data">
            <tr>
                <td className="dataForTodo">
                    <ul>
                        {todos.length ? (todos.map((todo) => {
                            return <KanbanBoardItem todo={todo} key={todo.id}/>;
                        })) : (<p className="markUp">Данных нет</p>)}
                    </ul>
                </td>
                <td className="dataForTodo">
                    <ul>
                        <p className="markUp">Данных нет</p>
                    </ul>
                </td>
                <td className="dataForTodo">
                    <ul>
                        <p className="markUp">Данных нет</p>
                    </ul>
                </td>
            </tr>
            </tbody>
        </table>
    );
};

export default KanbanBoardTable;*/
