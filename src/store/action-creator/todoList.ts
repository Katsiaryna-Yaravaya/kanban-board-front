import {TodoListActions, TodoListActionTypes} from "../../types/todoList";
import {Dispatch} from "redux";
import axios from "axios";

export const fetchTodoList =  () => {
    return async (dispatch: Dispatch<TodoListActions>) => {
        try {
            dispatch({type: TodoListActionTypes.FETCH_TODO_LIST})
            const response = await axios.get('http://localhost:8080/')
            dispatch({type: TodoListActionTypes.FETCH_TODO_LIST_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TodoListActionTypes.FETCH_TODO_LIST_ERROR,
                payload: "Произошла ошибка при загрузке"
            })
        }
    }
}

export const addTodoList =  async (todo) => {
    // return async (dispatch: Dispatch<TodoListActions>) => {
        try {
            const response = await axios.post('http://localhost:8080/', todo)
        } catch (e) {
            // dispatch({
            //     type: TodoListActionTypes.FETCH_TODO_LIST_ERROR,
            //     payload: "Произошла ошибка при загрузке"
            // })
        }

}

export const todoList =  (todos) => {
    return async (dispatch: Dispatch<TodoListActions>) => {
        try {
            dispatch({type: TodoListActionTypes.FETCH_TODO_LIST})
            await dispatch({type: TodoListActionTypes.FETCH_TODO_LIST_SUCCESS, payload: todos})
        } catch (e) {
            dispatch({
                type: TodoListActionTypes.FETCH_TODO_LIST_ERROR,
                payload: "Произошла ошибка при загрузке"
            })
        }
    }
}

export const addTodo =  (todo) => {
    return async (dispatch: Dispatch<TodoListActions>) => {
        try {
            await dispatch({type: TodoListActionTypes.TODO_ADD, payload: todo})
        } catch (e) {
            dispatch({
                type: TodoListActionTypes.FETCH_TODO_LIST_ERROR,
                payload: "Произошла ошибка при загрузке"
            })
        }
    }
}