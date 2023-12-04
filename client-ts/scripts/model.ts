import api from './api';
import { getElementByTag, getTodoListNode, createTodoNode } from './utils';
import { Todo } from './types';

export class TodoList {
    private todos: Todo[] = [];

    constructor() {
        this.addTodo = this.addTodo.bind(this);
        this.toggleTodo = this.toggleTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
    }

    private mountTodo(todo: Todo, position?: number) {
        const todoListNode = getTodoListNode();
        const newTodoNode = createTodoNode(todo);

        if (position === undefined) {
            todoListNode.appendChild(newTodoNode);
        } else {
            todoListNode.insertBefore(newTodoNode, todoListNode.childNodes[position]);
        }

        const toggleButton = newTodoNode.querySelector('.todo-list__todo-content > button');
        const removeButton = newTodoNode.querySelector('.todo-list__remove-action');

        toggleButton?.addEventListener('click', this.toggleTodo);
        removeButton?.addEventListener('click', this.removeTodo);
    }

    private unmountTodo(id: number) {
        const todoNode = document.querySelector(`[data-id="${id}"]`);

        if (todoNode) {
            const toggleButton = todoNode.querySelector('.todo-list__todo-content > button');
            const removeButton = todoNode.querySelector('.todo-list__remove-action');

            toggleButton?.removeEventListener('click', this.toggleTodo);
            removeButton?.removeEventListener('click', this.removeTodo);

            todoNode.parentNode?.removeChild(todoNode);
        }
    }

    private rerenderTodo(todo: Todo) {
        const todoNode = document.querySelector(`[data-id="${todo.id}"]`);

        if (!todoNode || !todoNode.parentNode) return;

        const position = Array.from(todoNode.parentNode.children).indexOf(todoNode);

        this.unmountTodo(todo.id);
        this.mountTodo(todo, position);
    }

    private mountTodoList() {
        this.todos.forEach((todo) => this.mountTodo(todo));
    }

    public async init() {
        const todos = await api.fetchTodos();
        
        this.todos = todos;
        this.mountTodoList();
    }

    public async addTodo(event: KeyboardEvent) {
        if (
            !event || !event.target ||
            event.code !== 'Enter' ||
            !(event.target instanceof HTMLInputElement) ||
            !event.target.value
        ) {
            return;
        }
    
        const { value } = event.target;

        const todo = await api.addTodo(value);
        
        this.mountTodo(todo);
        event.target.value = '';
    }

    public async toggleTodo(event: Event) {
        if (
            !event || !event.currentTarget ||
            !(event.currentTarget instanceof HTMLElement)) {
            return
        }

        const todoNode = getElementByTag(event.currentTarget, 'li');
        
        const rawId = todoNode?.getAttribute('data-id');
        const id = Number(rawId);
        
        const title = todoNode?.querySelector('.todo-list__todo-title')?.innerHTML;
        const completed = !todoNode?.classList.contains('todo-list__todo_completed');

        if (!todoNode || !rawId || !title) return;

        this.rerenderTodo({ id, title, completed })
        await api.toggleTodo(Number(id));
    }

    public async removeTodo(event: Event) {
        console.log('remove');

        if (!(event.currentTarget instanceof HTMLElement)) {
            return;
        }

        const todoNode = getElementByTag(event.currentTarget, 'li');
        const rawId = todoNode?.getAttribute('data-id');

        if (!todoNode || !rawId) return;

        const id = Number(rawId);

        this.unmountTodo(id);
        await api.removeTodo(id);
    }
}
