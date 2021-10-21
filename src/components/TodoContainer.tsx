import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Todo } from '../shared/types/todo';
import Header from './Header';
import InputTodo from './InputTodo';
import TodosList from './TodosList';

import About from '../pages/About'
import NotMatch from '../pages/NotMatch'

type TodoContainerProps = {

}

type TodoContainerState = {
  todos: Todo[];
}

export class TodoContainer extends Component<TodoContainerProps, TodoContainerState> {

  constructor(props: TodoContainerProps){
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          title: "Setup development environment",
          completed: true
        },
        {
          id: 2,
          title: "Develop website and add content",
          completed: false
        },
        {
          id: 3,
          title: "Deploy to live server",
          completed: false
        }
      ]
    };
  }

  componentDidMount(){
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(response => response.json())
      .then(data => this.setState({todos: data}))
  }
  
  componentDidUpdate(prevProp: TodoContainerProps, prevState: TodoContainerState){
    console.log('opoo', prevState)
    if(prevState.todos !== this.state.todos){
      const temp = JSON.stringify(this.state.todos);
      localStorage.setItem("todos", temp);
    }
  }

  handleChange = (id: number) => {
    console.log('changed!', id)
    this.setState(prev => {
      return {
        todos: prev.todos.map(todo => {
          if (todo.id === id){
            return {
              ...todo,
              completed: !todo.completed,
            }
          }
          return todo;
        }),
      }
    });
  }

  delTodo = (id: number) => {
    console.log('delete', id);
    this.setState({
      todos: [
        ...this.state.todos.filter(todo => todo.id !== id)
      ]
    })
  }

  addTodoItem = (title: string) => {
    console.log('add todo: ', title);
    const newTodo: Todo = {
      id: this.state.todos.length+1,
      title: title,
      completed: false,
    };
    this.setState({
      todos: [
        ...this.state.todos, newTodo
      ]
    })
  }

  updateTodo = (id: number, title: string) => {
    console.log(`update item ${id} with value: ${title}`);
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id){
          todo.title = title;
        }
        return todo;
      }),
    });
  }

  render() {
    return (
      <>
        <Switch>
          <Route exact path='/'>
            <div className="container">
              <div className="inner">
                <Header />
                <InputTodo onAddTodo={this.addTodoItem} />
                <TodosList 
                  todos={this.state.todos} 
                  onChange={this.handleChange} 
                  onDelete={this.delTodo} 
                  onUpdate={this.updateTodo}
                />
              </div>
            </div>
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="*">
            <NotMatch />
          </Route>
        </Switch>
      </>
    );
  }

}

export default TodoContainer
