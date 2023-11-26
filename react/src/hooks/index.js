import { useState, useEffect, useCallback } from 'react';

import { fetchTodos, addTodoToBackend, removeTodoFromBackend, completeTodo } from '../api';

export const useTodos = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos()
            .then((todos) => setTodos(todos))
            .catch((error) => console.log(error));
    }, []);

    const add = useCallback(
        async (title) => {
            const todo = await addTodoToBackend(title);

            setTodos((todos) => [...todos, todo]);
        }, 
        []
    );

    const remove = useCallback(
        async (id) => {
            setTodos((todos) => todos.filter((todo) => todo.id !== id));

            await removeTodoFromBackend(id);
        },
        []
    );

    const toggle = useCallback(
        async (id) => {
            setTodos((todos) => {
                return todos.map((todo) => ({
                    ...todo,
                    completed: todo.id === id ? !todo.completed : todo.completed
                }));
            });

            await completeTodo(id);
        },
        []
    );

    return {
        todos,
        add,
        remove,
        toggle
    };
};
