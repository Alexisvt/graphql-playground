// @flow
import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import logo from './logo.svg';
import './App.css';
import { addTodo, generatedId, findById, toggleTodo, updateTodo } from './lib/todoHelpers';
import { CreateTodoMutation } from './mutations/todo';
import { TodoItem, TodoForm, TodoList, SearchBox } from './components/todo';
import { debounce } from 'lodash';

class App extends Component {

  state = {
    currentTodo: ''
  };

  static propTypes = {
    store: PropTypes.object,
    relay: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.handleSearchChange = debounce(this.handleSearchChange, 300);
  }

  setLimit = (e) => {
    const limit = Number(e.target.value);
    this.props.relay.setVariables({ limit });
  };

  handleSubmit = (e: Event) => {
    e.preventDefault();
    Relay.Store.commitUpdate(new CreateTodoMutation({
      name: this.state.currentTodo,
      isComplete: false,
      store: this.props.store
    }));
    this.setState({ currentTodo: '' });
  }

  handleInputChange = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.setState({ currentTodo: e.target.value });
    }
  }

  handleSearchChange = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.props.relay.setVariables({ query: e.target.value });
    }
  }

  render() {
    return (<div className='App'>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>React Todos</h2>
      </div>
      <div className='Todo-App'>
        <SearchBox onChangeHandler={this.handleSearchChange} />
        <TodoForm
          currentTodo={this.state.currentTodo}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit} />
        <TodoList edges={this.props.store.todoConnection.edges}></TodoList>
      </div>
      <div>
        <select onChange={this.setLimit} defaultValue={this.props.relay.variables.limit}>
          <option value="2">2</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>);
  }
}

App = Relay.createContainer(App, {
  initialVariables: {
    limit: 50,
    query: ''
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        id
        todoConnection(first: $limit, query: $query) {
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
