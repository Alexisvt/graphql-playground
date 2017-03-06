import React, { PropTypes } from 'react';

export const SearchBox = ({ onChangeHandler }) => {
  return (
    <input type="text" placeholder="Search" onChange={(e) => { e.persist(); onChangeHandler(e); }} />
  );
};

SearchBox.propTypes = {
  onChangeHandler: PropTypes.func.isRequired
};