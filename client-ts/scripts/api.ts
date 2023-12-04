import { BACKEND_URL } from './constants';
import { Todo } from './types';

const fetchTodos = async () => {
    const response = await fetch(BACKEND_URL);
    const data: Todo[] = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
};

const addTodo = async (title: string) => {
    const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ title })
    });

    const data: Todo = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
};

const removeTodo = async (id: number) => {
    const response = await fetch(`${BACKEND_URL}/${id}`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }
};

const toggleTodo = async (id: number) => {
    const response = await fetch(`${BACKEND_URL}/${id}`, {
        method: 'PATCH'
    });

    const data: Todo = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
};

export default {
    fetchTodos,
    addTodo,
    removeTodo,
    toggleTodo
};
