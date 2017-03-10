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

  createDataSource = ({ todos: todoList = [] }) => {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    if (todoList && todoList.length > 0) {
      this.dataSource = ds.cloneWithRows(todoList);
    } else {
      console.error('No items on the list');
    }

  }

  handleItemClick = (todoItem: ITodo) => {
    this.setState({ text: todoItem.name });
  }

  onRenderRow = (todoItem: ITodo) => {
    return (
      <TouchableOpacity onPress={() => this.handleItemClick(todoItem)} >
        <TodoItem todo={todoItem} />
      </TouchableOpacity>
    );
  }

  render() {

    this.createDataSource(this.props.store);

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
          onRenderRow={this.onRenderRow}
          dataSource={this.dataSource} />
      </Card>
    );
  }
}

TodoList = Relay.createContainer(TodoList, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        ${TodoItem.getFragment('todo')}
      }
    `
  }
});

export default TodoList;