const API_URL = 'https://yatodo-api.vercel.app/api/todos';

export const fetchTodos = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
};

export const addTodoToBackend = async (title) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ title })
    });

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
};

export const removeTodoFromBackend = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }
};

export const completeTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH'
    });

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
};
