import React, { Component } from 'react'
import axios from 'axios';
import Idea from './idea';
import IdeaForm from './IdeaForm';
import update from 'immutability-helper';

class IdeasContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ideas: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/ideas.json')
    .then(response => {
      this.setState({ideas: response.data})
    })
    .catch(error => console.log(error))
  }

  addNewIdea = () => {
    axios.post(
      'http://localhost:3001/api/v1/ideas',
      { idea:
        {
          title: '<enter your title>',
          body: '<enter your body>'
        }
      }
    )
    .then(response => {
      console.log(response)
      const ideas = update(this.state.ideas, {
        $splice: [[0, 0, response.data]]
      })
      this.setState({
        ideas: ideas,
        editingIdeaId: response.data.id
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.addNewIdea} className="newIdeaButton">
            New Idea
          </button>
        </div>
      {this.state.ideas.map((idea) => {
        if(this.state.editingIdeaId === idea.id) {
          return(<IdeaForm idea={idea} key={idea.id} />)
        }
        else {
          return (<Idea idea={idea} key={idea.id} />)
        }
      })}
      </div>

    )
  }
}

export default IdeasContainer
