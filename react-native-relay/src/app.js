// @flow
import React, { Component, PropTypes } from 'react';

import {
  ListView,
  TouchableOpacity,
  ListViewDataSource
} from 'react-native';

import {
  Card,
  CardSection,
  Input,
  Header,
  TodoItemList,
  TodoItem
} from './Components';
import Relay from 'react-relay';

interface ITodo {
  id: string;
  name: string;
  isComplete: boolean;
  createdAt: string;
}

class TodoList extends Component {
  dataSource: ListViewDataSource;

  state = { text: '' };

  static propTypes = {
    store: PropTypes.object
  };

  createDataSource = (todos = []) => {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    if (todos && todos.length > 0) {
      this.dataSource = ds.cloneWithRows(todos);
    } else {
      console.error('No items on the list');
    }

  }

  handleItemClick = (todoItem: ITodo) => {
    const { name } = todoItem;
    console.log(`The item clicked was: ${JSON.stringify(todoItem, null, 2)}`);
    console.log(`The item's name is: ${ name }`);
    this.setState({ text: todoItem.name });
  }

  onRenderRow = (todoItem: ITodo) => {

    console.log(`onRenderRow item value: ${todoItem.name}`);

    return (
      <TouchableOpacity onPress={() => this.handleItemClick(todoItem)} >
        <TodoItem todo={todoItem} />
      </TouchableOpacity>
    );
  }

  render() {
    const { todos = [] } = this.props.store;

    this.createDataSource(todos);

    return (
      <Card >
        <Header headerText='Todo List' />
        <CardSection>
          <Input label='Todo'
            placeholder='Buy milk'
            value={this.state.text}
            onChangeText={(val) => { }}
            onSubmitEditing={(event) => { }}
          />
        </CardSection>
        <TodoItemList
          dataSource={this.dataSource}
          onRenderRow={this.onRenderRow}
        />
      </Card>
    );
  }
}

TodoList = Relay.createContainer(TodoList, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        todos {
          ${TodoItem.getFragment('todo')}
        }
      }
    `
  }
});

export default TodoList;