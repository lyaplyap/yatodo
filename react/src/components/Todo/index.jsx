import PropTypes from 'prop-types';
import cn from 'classnames';

import { CheckIcon, RemoveIcon } from '../../icons';
import { Button } from '../Button';

import styles from './index.module.css';

export const Todo = ({ id, title, completed, remove, toggle }) => {
    return (
        <li
            className={cn(styles.todo, { [styles.completed]: completed })}
            id={`todo-${id}`}
        >
            <div className={styles.content}>
                <Button onClick={() => toggle(id)}>
                    {completed ? <CheckIcon /> : <div />}
                </Button>
                <span className={styles.title}>{title}</span>
            </div>
            <Button
                className={styles.removeButton}
                onClick={() => remove(id)}
            >
                <RemoveIcon />
            </Button>
        </li>
    );
};

Todo.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    remove: PropTypes.func,
    toggle: PropTypes.func
};
