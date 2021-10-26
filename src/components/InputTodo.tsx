import React, { ChangeEvent, Component, FormEvent } from 'react'

type InputTodoProps = {
  onAddTodo: (title: string) => void;
}

type InputTodoState = {
  [name: string]: string;
  title: string;
  // campo2: string;
}

export class InputTodo extends Component<InputTodoProps, InputTodoState> {

  constructor(props: InputTodoProps){
    super(props);
    this.state = {
      title: "",
      // campo2: "",
    }
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('oi')
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!this.state.title.trim()){
      alert('Opa!')
      return;
    }
    console.log('submit!', this.state)
    this.props.onAddTodo(this.state.title);
    this.setState({
      title: "",
    })
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-container">
        <input type="text" className="input-text" placeholder="Add todo..." value={this.state.title} onChange={this.handleChange} name="title" />
        {/* <input type="text" placeholder="Add todo..." value={this.state.campo2} onChange={this.onChange} name="campo2" /> */}
        <button className="input-submit">Submit</button>
      </form>
    )
  }
}

export default InputTodo
