import createDeepstream from 'deepstream.io-client-js';
import React, { Component } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Record from './Record';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {todos: []};
    // connect to deepstream
    this.ds = createDeepstream('<YOUR API KEY HERE>');
    // login
    this.client = this.ds.login();
    // this.myRecord = this.ds.record.getRecord( 'test/johndoe' );
    this.todoRecord = this.ds.record.getRecord( 'default/todos' );

    this.todoRecord.subscribe(value => {
      this.setState({todos: value.todos});
    });
  }

  addTodo(val){
    const todos = this.state.todos;
    const todo = {text: val, todoId: this.client.getUid()};
    todos.push(todo);
    this.todoRecord.set('todos', todos);
  }

  removeTodo(todoId){
    const remainder = this.state.todos.filter((todo) => {
      if(todo.todoId !== todoId) return todo;
    })
    this.todoRecord.set('todos', remainder);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Todo List</h2>
        </div>
        <TodoForm addTodo={this.addTodo.bind(this)} />
        <TodoList todos={this.state.todos} recordName='todos' ds={this.ds} removeTodo={this.removeTodo.bind(this)} />

        {/* <Record record={this.myRecord} /> */}
      </div>
    );
  }
}

export default App;
