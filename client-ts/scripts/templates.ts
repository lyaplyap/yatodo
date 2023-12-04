import { Todo } from './types';

export const getCheckboxHTML = (completed: boolean) => {
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

export const getTodoHTML = ({ title, completed }: Todo) => {
    return `
        <div class="todo-list__todo-content">
            <button>${getCheckboxHTML(completed)}</button>
            <span class="todo-list__todo-title">${title}</span>
        </div>
        <button class="todo-list__remove-action">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.4999 9.31827L12.9547 14.7731L14.773 12.9548L9.31817 7.5L14.773 2.04518L12.9547 0.226901L7.49989 5.68173L2.04507 0.226902L0.226796 2.04518L5.68162 7.5L0.226797 12.9548L2.04507 14.7731L7.4999 9.31827ZM7.4999 9.31827L9.31817 7.5L7.49989 5.68173L5.68162 7.5L7.4999 9.31827Z" fill="currentColor" fill-opacity="1"/>
                <path d="M7.4999 9.31827L9.31817 7.5L7.49989 5.68173L5.68162 7.5L7.4999 9.31827Z" fill="currentColor" fill-opacity="1"/>
            </svg>
        </button>
    `;
};
