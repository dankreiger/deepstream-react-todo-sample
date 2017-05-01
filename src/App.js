import createDeepstream from 'deepstream.io-client-js';
import React, { Component } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {todos: []};
    if(process.env.NODE_ENV!=='test'){
      // connect to deepstream
      this.ds = createDeepstream('<YOUR API KEY>');
      // login
      this.client = this.ds.login();
      // this.myRecord = this.ds.record.getRecord( 'test/johndoe' );
      this.todoRecord = this.ds.record.getRecord( 'default/todos' );

      this.todoRecord.subscribe(value => {
        this.setState({todos: value.todos});
      });
    }
  }

  setDsRecord(todos){
    this.todoRecord.set('todos', todos);
  }

  addTodo(val){
    const todo = {text: val, todoId: this.client.getUid()};
    this.state.todos.push(todo);
    this.setDsRecord(this.state.todos);
  }

  removeTodo(todoId){
    const remainder = this.state.todos.filter((todo) => {
      if(todo.todoId !== todoId) return todo;
    })
    this.setDsRecord(remainder);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Todo List</h2>
        </div>
        <TodoForm addTodo={this.addTodo.bind(this)} />
        <TodoList todos={this.state.todos} recordName='todos' ds={this.ds} removeTodo={this.removeTodo.bind(this)} />
      </div>
    );
  }
}

export default App;
