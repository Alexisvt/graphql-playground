// @flow
import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import { CardSection } from './CardSection';
import { IconButton } from './IconButton';
import Relay from 'react-relay';
import moment from 'moment';

interface ITodoItemProps {
  todo: Object;
  relay?: any;
  handleRemoveButton?: Function; 
}

export let TodoItem = ({ todo, relay, handleRemoveButton }: ITodoItemProps) => {

  const { isComplete, name, id, createdAt } = todo;
  const decoration = isComplete ? 'line-through' : 'none';

  return (
    <CardSection styles={{ justifyContent: 'space-between', flex: 1 }}>
      <Text style={{ flex: 1, textDecorationLine: decoration }} >Date: {moment(createdAt).format('L')} | Name: {name}</Text>
      <IconButton onPress={handleRemoveButton} iconName="close-o" iconColor="#F39C12" iconStyle={{ fontSize: 30, alignSelf: 'center' }} />
    </CardSection>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  relay: PropTypes.object,
  handleRemoveButton: PropTypes.func
};

TodoItem = Relay.createContainer(TodoItem, {
  fragments: {
    todo: () => Relay.QL`
    fragment on Todo {
      id
      name
      isComplete
      createdAt
    }
    `
  }
});