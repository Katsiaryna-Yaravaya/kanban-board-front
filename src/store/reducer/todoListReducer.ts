import {TodoListActions, TodoListActionTypes, TodoListState} from "../../types/todoList";

const initialState: TodoListState = {
    todos: [],
    loading: false,
    error: null
}

export const todoListReducer = (state = initialState, action: TodoListActions): TodoListState => {
    switch (action.type) {
        case TodoListActionTypes.FETCH_TODO_LIST:
            return {
                ...state,
                loading: true
            }
        case TodoListActionTypes.FETCH_TODO_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: action.payload
            }
        case TodoListActionTypes.TODO_ADD:
            const newTodos = state.todos.concat(action.payload)
            return {
                ...state,
                todos: newTodos
            }
        case TodoListActionTypes.FETCH_TODO_LIST_ERROR:
            return {
                ...state,
                error: action.payload,
                todos: []
            }
        default:
            return state
    }
}