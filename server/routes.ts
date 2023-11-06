import { Router } from 'express';

import Todos from './models';

const router = Router();

/**
 * GET: /api/todos
 */
router.get('/', async (_, response) => {
    const todos = Todos.getTodos();
        
    return response.json(todos);
});

/**
 * GET: /api/todos/:id
 */
router.get('/:id', async (request, response) => {
    const { id } = request.params;
    const todo = Todos.getTodoById(Number(id));

    if (!todo) {
        return response.status(404).json({
            code: 'NOT_FOUND',
            message: 'The requested todo was not found'
        });
    }
        
    return response.json(todo);
});

/**
 * POST: /api/todos
 */
router.post('/', async (request, response) => {
    const { title }: { title: string } = request.body;

    const todo = Todos.addTodo(title);

    return response.json(todo);
});

/**
 * DELETE: /api/todos/:id
 */
router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    
    try {
        const todo = Todos.removeTodo(Number(id));
     
        return response.json(todo);
    } catch {
        return response.status(404).json({
            code: 'NOT_FOUND',
            message: 'The requested todo was not found'
        });
    }
});

/**
 * PATCH: /api/todos/:id
 */
router.patch('/:id', async (request, response) => {
    const { id } = request.params;
    
    try {
        const todo = Todos.toggleTodo(Number(id));
     
        return response.json(todo);
    } catch {
        return response.status(404).json({
            code: 'NOT_FOUND',
            message: 'The requested todo was not found'
        });
    }
});

/**
 * POST: /api/todos/reset
 */
router.post('/reset', async (_, response) => {
    Todos.resetTodos();

    return response.status(204).json();
});

export default router;