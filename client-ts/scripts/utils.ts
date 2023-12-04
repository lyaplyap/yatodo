import { getTodoHTML } from './templates';
import { Todo } from './types';

export const getElementByTag = (element: Element | null, tagName: string) => {
    let currentElement = element;

    const isRequiredTag = (element: Element) => element?.tagName.toLowerCase() === tagName;

    while (currentElement && !isRequiredTag(currentElement)) {
        currentElement = currentElement.parentElement;
    }

    return currentElement;
};

export const createTodoNode = (todo: Todo) => {
    const { id, completed } = todo;
    const node = document.createElement('li');
        
    node.innerHTML = getTodoHTML(todo);
    node.className = `todo-list__todo ${completed ? 'todo-list__todo_completed' : ''}`;
    node.setAttribute('data-id', String(id));

    return node;
};

export const getTodoListNode = () => {
    return document.getElementsByClassName('todo-list__list')[0];
};
