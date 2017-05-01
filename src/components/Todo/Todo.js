import React from 'react';

const Todo = ({text, todoId, removeTodo}) => {
  return(
    <li>
      {text}
      <button onClick={() => removeTodo(todoId)}>-</button>
    </li>
  )

}

export default Todo;
