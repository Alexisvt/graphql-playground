// @flow
import React, { Component } from 'react';
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
    store: React.PropTypes.object
  }
  // state: IAppState;

  // constructor() {
  // super();

  // this.state = {
  //   todos: [
  //     { id: 1, name: 'Learn JSX!', isComplete: true },
  //     { id: 2, name: 'Build an Awesome App', isComplete: false },
  //     { id: 3, name: 'Ship It', isComplete: false }
  //   ],
  //   currentTodo: ''
  // };

  // (this: any).handleToggle = this.handleToggle.bind(this);
  // (this: any).handleInputChange = this.handleInputChange.bind(this);
  // (this: any).handleSubmit = this.handleSubmit.bind(this);
  // (this: any).handleEmptySubmit = this.handleEmptySubmit.bind(this);
  // }

  // handleSubmit(e: Event) {
  //   e.preventDefault();

  //   const id = generatedId();
  //   const newTodo: ITodo = { name: this.state.currentTodo, isComplete: false, id };
  //   const todos: ITodo[] = addTodo(this.state.todos, newTodo);
  //   this.setState({ todos, currentTodo: '' });
  // }

  // handleEmptySubmit(e: Event) {
  //   e.preventDefault();

  //   this.setState({ errorMessage: 'Please add non empty task', currentTodo: '' });
  // }

  // handleToggle(id: number) {
  //   const item = findById(id, this.state.todos);
  //   const updatedItem = toggleTodo(item);
  //   const updatedList = updateTodo(this.state.todos, updatedItem);
  //   this.setState({todos: updatedList});
  // }

  // handleInputChange(e: Event) {
  //   if (e.target instanceof HTMLInputElement) {
  //     this.setState({ currentTodo: e.target.value, errorMessage: '' });
  //   }
  // }

  render() {
    // const currentTodo = this.state.currentTodo;
    // const handleSubmit = currentTodo.length !== 0 && currentTodo.trim() ? this.handleSubmit : this.handleEmptySubmit;

    // return (
    //   <div className="App">
    //     <div className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <h2>React Todos</h2>
    //     </div>
    //     <div className="Todo-App">
    //       {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
    //       <TodoForm
    //         currentTodo={this.state.currentTodo}
    //         handleInputChange={this.handleInputChange}
    //         handleSubmit={handleSubmit} />
    //       <TodoList handleToggle={this.handleToggle} todosElements={this.state.todos} />
    //     </div>
    //   </div>
    // );
    // return (<div className='App'>
    //   <div className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <h2>React Todos</h2>
    //   </div>
    //   <div className='Todo-App'>
    //     <TodoList todos={this.props.store.todos}></TodoList>
    //   </div>
    // </div>);

    return (<div className='App'>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>React Todos</h2>
      </div>
      <div className='Todo-App'>
        <TodoList edges={this.props.store.todoConnection.edges}></TodoList>
      </div>
    </div>);
  }
}

App = Relay.createContainer(App, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        todoConnection(first: 3) {
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
