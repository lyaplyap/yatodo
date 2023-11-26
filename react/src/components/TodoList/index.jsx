import PropTypes from 'prop-types';

import { Todo } from '../Todo';

import styles from './index.module.css';

export const TodoList = ({ todos, remove, toggle }) => {
    return (
        <ul className={styles.list}>
            {todos.map(({ id, title, completed }) => (
                <Todo
                    key={id}
                    id={id}
                    title={title}
                    completed={completed}
                    remove={remove}
                    toggle={toggle}
                />
            ))}
        </ul>
    );
};

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            completed: PropTypes.bool
        })
    ),
    remove: PropTypes.func,
    toggle: PropTypes.func
};
