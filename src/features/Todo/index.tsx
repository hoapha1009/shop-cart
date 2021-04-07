import React, { useEffect, useMemo, useState } from "react";
import TodoList from "./components/TodoList";
import "./styles.scss";
import queryString from "query-string";
import { useHistory, useLocation, useRouteMatch } from "react-router";

interface TodoItem {
    id: number;
    title: string;
    status: string;
}

const TodoFeature = () => {
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();

    const [filtered, setFiltered] = useState(() => {
        const params = queryString.parse(location.search);

        return params.status || "all";
    });

    const [todoList, setTodoList] = useState<TodoItem[]>((): TodoItem[] => {
        return [
            {
                id: 1,
                title: "Eat",
                status: "new",
            },
            {
                id: 2,
                title: "Sleep",
                status: "completed",
            },
            {
                id: 3,
                title: "Code",
                status: "new",
            },
        ];
    });

    const handleTodoClick = (todo: TodoItem, idx: number) => {
        const newTodoList = [...todoList];

        const newTodo = {
            ...newTodoList[idx],
            status:
                newTodoList[idx].status === "completed" ? "new" : "completed",
        };

        newTodoList[idx] = newTodo;

        setTodoList(newTodoList);
    };

    const handleShowAllClick = () => {
        const queryParams = {
            status: "all",
        };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        });
    };

    const handleShowCompletedClick = () => {
        const queryParams = {
            status: "completed",
        };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        });
    };

    const handleShowNewClick = () => {
        const queryParams = {
            status: "new",
        };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        });
    };

    useEffect(() => {
        const params = queryString.parse(location.search);
        setFiltered(params.status || "all");
    }, [location.search]);

    const renderTodoList = useMemo(() => {
        return todoList.filter(
            (todo) => todo.status === filtered || filtered === "all"
        );
    }, [todoList, filtered]);

    return (
        <div>
            <h3>Todo List</h3>
            <TodoList todoList={renderTodoList} onTodoClick={handleTodoClick} />

            <div>
                <button onClick={handleShowAllClick}>Show All</button>
                <button onClick={handleShowCompletedClick}>
                    Show Completed
                </button>
                <button onClick={handleShowNewClick}>Show New</button>
            </div>
        </div>
    );
};

export default TodoFeature;
