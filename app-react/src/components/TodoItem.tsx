import classNames from 'classnames';
import React, { KeyboardEvent, useState } from 'react'
import { Todo } from '../shared/types/todo'
import styles  from './TodoItem.module.scss'

type TodoItemProps = {
  todo: Todo;
  onChange: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
}

function TodoItem(props: React.PropsWithChildren<TodoItemProps>) {
  const { todo, onChange, onDelete, onUpdate } = props;
  const [editing, setEditing] = useState<boolean>(false);

  const handleEditing = () => {
    console.log('edit')
    setEditing(true);
  }

  const handleUpdateDone = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter"){
      setEditing(false);
    }
  }

  return (
    <li className={styles.item}>
      <div onDoubleClick={handleEditing} className={classNames({'d-none': editing})}>
        <input 
          type="checkbox"
          className={styles.checkbox}
          checked={todo.completed} 
          onChange={() => onChange(todo.id)}
        />
        <button onClick={() => onDelete(todo.id)}>delete</button>
        <span className={todo.completed ? styles.completedItem : undefined}>
          {todo.title}
        </span>
      </div>
      <input 
        type="text" 
        className={classNames(styles.textInput, {'d-none': !editing})} 
        value={todo.title} 
        onChange={(e) => onUpdate(todo.id, e.target.value)}
        onKeyDown={handleUpdateDone}
      />
    </li>
  )
}

export default TodoItem
