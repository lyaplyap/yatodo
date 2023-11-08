/* API */
const API_URL = 'https://yatodo-api.vercel.app/api/todos';

const fetchTodos = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
};

const addTodoToBackend = async (title) => {
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

const removeTodoFromBackend = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }
};

const completeTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH'
    });

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
};

/* Utils */
const getElementByTag = (element, parentTag) => {
    let currentElement = element;

    const isRequiredTag = (element) => element?.tagName.toLowerCase() === parentTag;

    while (currentElement && !isRequiredTag(currentElement)) {
        currentElement = currentElement.parentNode;
    }

    return currentElement;
};

/* HTML builders */
const getCheckboxHTML = (completed) => {
    if (completed) {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="15" viewBox="0 0 19 15" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.25 9.75L16.25 0.75L18.5 3L9.5 12L7.25 9.75ZM5 12L7.25 9.75L2.75 5.25L0.5 7.5L5 12Z" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.25 9.75L16.25 0.75L18.5 3L9.5 12L7.25 9.75ZM5 12L7.25 9.75L2.75 5.25L0.5 7.5L5 12Z" fill="#0055FF" fill-opacity="0.1"/>
                <path d="M5 12L7.25 14.25L9.5 12L7.25 9.75L5 12Z" fill="white"/>
                <path d="M5 12L7.25 14.25L9.5 12L7.25 9.75L5 12Z" fill="#0055FF" fill-opacity="0.1"/>
            </svg>
        `;
    }

    return '<div></div>';
};

const getTodoHTML = ({ title, completed }) => {
    return `
        <div class="todo-list__todo-content">
            <button onclick="toggleTodo(event);">${getCheckboxHTML(completed)}</button>
            <span class="todo-list__todo-title">${title}</span>
        </div>
        <button class="todo-list__remove-action" onclick="removeTodo(event);">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.4999 9.31827L12.9547 14.7731L14.773 12.9548L9.31817 7.5L14.773 2.04518L12.9547 0.226901L7.49989 5.68173L2.04507 0.226902L0.226796 2.04518L5.68162 7.5L0.226797 12.9548L2.04507 14.7731L7.4999 9.31827ZM7.4999 9.31827L9.31817 7.5L7.49989 5.68173L5.68162 7.5L7.4999 9.31827Z" fill="currentColor" fill-opacity="1"/>
                <path d="M7.4999 9.31827L9.31817 7.5L7.49989 5.68173L5.68162 7.5L7.4999 9.31827Z" fill="currentColor" fill-opacity="1"/>
            </svg>
        </button>
    `;
};

/* Initialization */
const getTodoNode = ({ id, title, completed }) => {
    const node = document.createElement('li');
        
    node.className = `todo-list__todo ${completed ? 'todo-list__todo_completed' : ''}`;
    node.setAttribute('data-id', id);

    node.innerHTML = getTodoHTML({ title, completed });

    return node;
};

const getTodoNodes = (todos) => {
    const nodes = [];
  
    for (const todo of todos) {
        const todoNode = getTodoNode(todo);
        
        nodes.push(todoNode);
    }
  
    return nodes;
};

const insertTodos = async (todos) => {
    const todosNode = document.body.querySelector('.todo-list__list');
  
    if (todosNode) {
        todosNode.append(...getTodoNodes(todos));
    }
};
  
document.addEventListener('DOMContentLoaded', async () => {
    const todos = await fetchTodos();

    insertTodos(todos);
});

/* Business logic */
const toggleTodo = async (event) => {
    const node = getElementByTag(event.currentTarget, 'li');

    if (!node) return;

    const id = node.getAttribute('data-id');
    const title = node.querySelector('.todo-list__todo-title').innerText;
    const completed = !node.classList.contains('todo-list__todo_completed');

    node.classList.toggle('todo-list__todo_completed');
    node.innerHTML = getTodoHTML({ title, completed });
    
    await completeTodo(id);
};

const removeTodo = async (event) => {
    const node = getElementByTag(event.currentTarget, 'li');

    if (!node) return;

    const id = node.getAttribute('data-id');

    node.parentNode.removeChild(node);

    await removeTodoFromBackend(id);
};

const addTodo = async (event) => {
    if (event.code !== 'Enter') return;

    const { value } = event.currentTarget;

    if (!value) return;

    const todos = document.body.querySelector('.todo-list__list');

    const todo = await addTodoToBackend(value);

    todos.appendChild(getTodoNode(todo));
    event.target.value = '';
};
