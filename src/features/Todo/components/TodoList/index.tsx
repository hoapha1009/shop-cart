import classnames from "classnames";
import React from "react";
import "./styles.scss";

interface TodoItem {
    id: number;
    title: string;
    status: string;
}

type P = {
    todoList: TodoItem[];
    onTodoClick: (todo: TodoItem, idx: number) => void;
};

const TodoList: React.FC<P> = ({ todoList, onTodoClick }) => {
    const todoClickHandler = (todo: TodoItem, idx: number) => {
        if (!onTodoClick) return;

        onTodoClick(todo, idx);
    };

    return (
        <ul>
            {todoList.map((todo, idx) => {
                return (
                    <li
                        key={todo.id}
                        onClick={() => todoClickHandler(todo, idx)}
                        className={classnames({
                            active: todo.status === "completed",
                        })}
                    >
                        {todo.title}
                    </li>
                );
            })}
        </ul>
    );
};

export default TodoList;
