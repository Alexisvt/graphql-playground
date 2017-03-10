import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import Relay from 'react-relay';

class ShowStoreId extends Component {

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { id, todos } = this.props.store;
    const texts = todos.map((todo) => (
      <Text key={todo.id}>Todo name: {todo.name} </Text>
    ));
    return (
      <View>
        <Text>The Store id was: {id}</Text>
        {texts}
      </View>
    );
  }
}

ShowStoreId = Relay.createContainer(ShowStoreId, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        id
        todos {
          id
          name
          isComplete
          createdAt
        }
      }
    `
  }
});

export default ShowStoreId;