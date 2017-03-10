// @flow
import React, { PropTypes } from 'react';
import { CardSection } from './CardSection';
import { ListView } from 'react-native';

export let TodoItemList = ({ dataSource, onRenderRow }) => {

  return (
    <CardSection>
      <ListView
        style={{ flex: 1, flexDirection: 'column' }}
        enableEmptySections
        dataSource={dataSource}
        renderRow={onRenderRow} />
    </CardSection>
  );
};

TodoItemList.propTypes = {
  onRenderRow: PropTypes.func.isRequired,
  dataSource: PropTypes.any.isRequired
};