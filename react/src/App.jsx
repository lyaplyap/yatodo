import { Title } from './components/Title';
import { Input } from './components/Input';
import { TodoList } from './components/TodoList';

import { useTodos } from './hooks';

export const App = () => {
    const { todos, add, remove, toggle } = useTodos();

    return (
        <div className="container">
            <Title />
            <Input add={add} />
            <TodoList
                todos={todos}
                remove={remove}
                toggle={toggle}
            />
        </div>
    );
};
