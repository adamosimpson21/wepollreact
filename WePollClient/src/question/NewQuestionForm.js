import React, {Component} from 'react';
import './NewQuestionForm.css'

class NewQuestionForm extends Component{
  defaultState = {
    question: '',
    title:'',
    description:'',
    education:'',
    answers:[]
  }

  state = this.defaultState;

  handleSubmit = event => {
    event.preventDefault()
    this.setState(this.defaultState)
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value
    });
  }

  render(){
    return(<div className='new-question-form'>
      <form onSubmit={this.handleSubmit}>
        <label> Question:
          <input
            type='text'
            name'question'
            aria-label='Your Question'
            value={this.state.question}
            onChange = {this.handleChange}
          />
        </label>
        <label> Title:
          <input
            type='text'
            name'title'
            aria-label='Short title'
            value={this.state.title}
            onChange = {this.handleChange}
          />
        </label>
        <label> Description:
          <input
            type='text'
            name'description'
            aria-label='Detailed Description'
            value={this.state.description}
            onChange = {this.handleChange}
          />
        </label>
        <label> Education:
          <input
            type='text'
            name'education'
            aria-label='An Educational Resource to teach others about possible answers'
            value={this.state.education}
            onChange = {this.handleChange}
          />
        </label>



        <button>Create this Question</button>
      </form>
    </div>)
  }
}

export default NewQuestionForm;