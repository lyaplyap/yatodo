import todosData from './data.json';
import { Todo } from './types';

class Todos {
    data: Todo[] = [];

    constructor() {
        this.data = JSON.parse(JSON.stringify(todosData));
    }

    getTodos() {
        return this.data;
    }

    getTodoById(id: number) {
        return this.data.find((todo) => todo.id === id) || null;
    }

    addTodo(title: string) {
        const todo: Todo = {
            id: this.data.length,
            title,
            completed: false
        };
        
        this.data.push(todo);

        return todo;
    }

    removeTodo(id: number) {
        const todo = this.getTodoById(id);

        if (!todo) {
            throw new Error('TODO_NOT_FOUND');
        }

        this.data = this.data.filter((todo) => todo.id !== id);

        return todo;
    }

    toggleTodo(id: number) {
        const todo = this.getTodoById(id);

        if (!todo) {
            throw new Error('TODO_NOT_FOUND');
        }

        todo.completed = !todo.completed;

        return todo;
    }

    resetTodos() {
        this.data = JSON.parse(JSON.stringify(todosData));
    }
}

const model = new Todos();

export default model;