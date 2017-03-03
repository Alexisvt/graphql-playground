// @flow
import React, { PropTypes } from 'react';
import { TodoItem } from './TodoItem';

export let TodoList = ({ edges = [] }) => {
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