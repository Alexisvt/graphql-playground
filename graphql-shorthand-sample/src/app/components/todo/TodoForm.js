// @flow
import React, {PropTypes} from 'react';

interface ITodoFormProps {
  currentTodo: string;
  handleInputChange(e: Event): void;
  handleSubmit(e: Event):void;
}

export const TodoForm = ({currentTodo, handleInputChange, handleSubmit}: ITodoFormProps) => (
  <form onSubmit={handleSubmit}>
    <input 
      type="text" 
      value={currentTodo} 
      onChange={handleInputChange} />
  </form>
);

TodoForm.propTypes = {
  currentTodo: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};