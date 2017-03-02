// @flow
import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import logo from './logo.svg';
import './App.css';
import { addTodo, generatedId, findById, toggleTodo, updateTodo } from './lib/todoHelpers';

import TodoList from './components/todo/TodoList';
import TodoItem from './components/todo/TodoItem';

export interface ITodo {
  id: string;
  name: string;
  isComplete: boolean;
}

interface IAppState {
  todos: ITodo[],
  currentTodo: string;
  errorMessage?: string;
}

class App extends Component {

  static propTypes = {
    store: PropTypes.object,
    relay: PropTypes.object
  }

  setLimit = (e) => {
    const limit = Number(e.target.value);
    this.props.relay.setVariables({ limit });
  };

  render() {
    return (<div className='App'>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>React Todos</h2>
      </div>
      <div className='Todo-App'>
        <TodoList edges={this.props.store.todoConnection.edges}></TodoList>
      </div>
      <div>
        <select onChange={this.setLimit} defaultValue={this.props.relay.variables.limit}>
          <option value="2">2</option>
          <option value="4">4</option>
        </select>
      </div>
    </div>);
  }
}

App = Relay.createContainer(App, {
  initialVariables: {
    limit: 2
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        todoConnection(first: $limit) {
          edges {
            node {
              id
              ${TodoItem.getFragment('todo')}
            }
          }
        }
      }
    `
  }
});

export default App;
