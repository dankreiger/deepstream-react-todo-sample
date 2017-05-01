import React from 'react';
import Todo from '../Todo/Todo';

const TodoList = ({todos, removeTodo}) => {
  const todoNode = todos.map((todo) => {
    return (
      <Todo
        key={todo.todoId}
        text={todo.text}
        todoId={todo.todoId}
        removeTodo={removeTodo}
      />
    )
  })

  return(<ul>{todoNode}</ul>)
}

export default TodoList;
