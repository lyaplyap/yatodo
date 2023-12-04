import { TodoList } from './model';

const model = new TodoList();

const initTodoInput = async () => {
    const input = document.getElementsByTagName('input')[0];

    input.addEventListener('keydown', model.addTodo);
}

document.addEventListener('DOMContentLoaded', initTodoInput);
document.addEventListener('DOMContentLoaded', () => model.init());
