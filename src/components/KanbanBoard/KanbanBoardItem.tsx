import React, {useRef} from "react"
import {useDrag, useDrop} from "react-dnd";
import {COLUMN_NAMES} from "../../constants";
import "./kanbanBoardItem.css"

const KanbanBoardItem = ({name, index, currentColumnName, moveCardHandler, date, setItems}) => {

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
            <p className="itemTitle" title={name}>{name}</p>
            <p>{date}</p>
        </div>
    )
}

export default KanbanBoardItem;
