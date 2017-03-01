// @flow
import React, { PropTypes } from 'react';
import { type ITodo } from '../../App';
import TodoItem from './TodoItem';

interface ITodoListProps {
  node: ITodo[];
  handleToggle?: (taskId: string) => void;
}

let TodoList = ({edges}) => {

  return (
    <div className="Todo-List">
      <ul>
        {edges.map((edge) => {
          return (
            <TodoItem key={edge.node.id} todo={edge.node} />
          );
        })}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  edges: PropTypes.array.isRequired,
  handleToggle: PropTypes.func
};

export default TodoList;