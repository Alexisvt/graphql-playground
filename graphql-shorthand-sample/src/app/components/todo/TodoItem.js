// @flow
import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { type ITodo } from '../../App';

interface ITodoItem {
  todo: ITodo;
  handleToggle?: (id: string) => void
}

let TodoItem = ({todo, handleToggle = () => { }}: ITodoItem) => {

  const {isComplete, name, id} = todo;
  
  return (
    <li>
      <input checked={isComplete} onChange={() => handleToggle(id)} type="checkbox" /> Learn {name}
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  handleToggle: PropTypes.func
};

TodoItem = Relay.createContainer(TodoItem, {
  fragments: {
    todo: () => Relay.QL`
      fragment on Todo {
        id
        name
        isComplete
      }
    `
  }
});

export default TodoItem;