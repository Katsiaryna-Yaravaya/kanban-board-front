export interface ITodo {
    title: string,
    id: number,
    date: string,
    column: string,
    index: number,
}

export interface TodoListState {
    todos: ITodo[],
    loading: boolean,
    error: null | string
}

export enum TodoListActionTypes {
    FETCH_TODO_LIST = "FETCH_TODO_LIST",
    FETCH_TODO_LIST_SUCCESS = "FETCH_TODO_LIST_SUCCESS",
    FETCH_TODO_LIST_ERROR = "FETCH_TODO_LIST_ERROR",
    TODO_ADD = "TODO_ADD"
}

interface FetchTodoListAction {
    type: TodoListActionTypes.FETCH_TODO_LIST;
}

interface FetchTodoListSuccessAction {
    type: TodoListActionTypes.FETCH_TODO_LIST_SUCCESS;
    payload: any
}

interface AddTodoAction {
    type: TodoListActionTypes.TODO_ADD;
    payload: []
}

interface FetchTodoListErrorAction {
    type: TodoListActionTypes.FETCH_TODO_LIST_ERROR;
    payload: string
}

export type TodoListActions =
    FetchTodoListAction
    | FetchTodoListSuccessAction
    | FetchTodoListErrorAction
    | AddTodoAction
