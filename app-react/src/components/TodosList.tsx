import React, { Component } from 'react'
import { Todo } from '../shared/types/todo'
import TodoItem from './TodoItem'

type TodoListProps = {
  todos: Todo[];
  onChange: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
}

export class TodosList extends Component<TodoListProps, {}> {
  render() {
    return (
      <ul>
        {this.props.todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onChange={this.props.onChange}
            onDelete={this.props.onDelete}
            onUpdate={this.props.onUpdate}
          />
        ))}
      </ul>
    )
  }
}

export default TodosList
