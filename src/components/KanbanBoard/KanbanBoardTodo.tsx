import React, {ChangeEvent, useState} from 'react';
import './kanbanBoardTodo.css';
import {useDispatch} from 'react-redux';
import {addTodoList, fetchTodoList} from '../../store/action-creator/todoList';
import {ITodo} from '../../types/todoList';
import moment from 'moment';
import {COLUMN_NAMES} from "../../constants";

const KanbanBoardTodo = () => {

    const [value, setValue] = useState<string>("");
    const dispatch = useDispatch()
    const {DO_IT} = COLUMN_NAMES;

    const submitHandler = async (event) => {
        event.preventDefault();
        if (value.trim()) {
            const todo: ITodo = {
                title: value,
                id: Date.now(),
                date: moment().format("DD.MM.YYYY HH:mm"),
                column: DO_IT,
                index: Date.now()
            }

            await addTodoList(todo)
            dispatch(fetchTodoList());
            setValue("");// очищает строку
        }
    }

    function changeHandler(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    return (
        <form method="post" action="/" className="todoForm" onSubmit={submitHandler}>
            <input className="todoInput" value={value} placeholder="Your todo list" onChange={changeHandler}/>
            <button className="todoButton" type="submit">Add</button>
        </form>
    );
};

export default KanbanBoardTodo;