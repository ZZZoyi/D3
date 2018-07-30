import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {CSSTransition} from 'react-transition-group'
import styled from 'styled-components'
import uuid from 'uuid'

const TestP = styled.div`
  display: none;
  transform-origin:0 bottom;

  &.test-enter{
    transform:rotateZ(90deg);

    &.test-enter-active{
      transition:transform .3s;
      transform: rotateZ(0deg);
    }
  }

  &.test-exit{
    transform:rotateZ(0deg);

    &.test-exit-active{
      transition:transform .3s;
      transform: rotateZ(90deg);
    }
  }
`

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      newProject: {},
      showP: false
    }
  }

  static defaultProps = {
    categories: ['Web Design', 'Web Development', 'Mobile Development']
  }

  handleSubmit(e) {
    if (this.refs.title.value === '') {
      alert('title is required')
    } else {
      this.setState({newProject:{
        id: uuid.v4(),
        title: this.refs.title.value,
        category: this.refs.category.value
      }}, function() {
        this.props.addProject(this.state.newProject)
      })
    }
    this.setState({showP: false})
    e.preventDefault();
  }

  componentDidUpdate (prevProps, prevState) {
    let { newProject } = this.state
    if (newProject.title !== prevState.newProject.title) {
      this.setState({showP: true})
    }
  }

  render() {
    let categoryOptions = this.props.categories.map(category => {
      return <option key={category} value={category}>{category}</option>
    })
    return (
      <div>
        <h3>Add Project</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Title</label><br />
            <input type="text" ref="title" />
          </div>
          <div>
            <label>Category</label><br />
            <select ref="category">
              {categoryOptions}
            </select>
          </div>
          <input type="submit" value="Submit" />
        </form>
        <CSSTransition in={this.state.showP} classNames="test" timeout={300}>
          <TestP style={{display: this.state.showP ? 'block' : 'none'}}>{this.state.newProject.title}</TestP>
        </CSSTransition>
      </div>
    )
  }
}


AddProject.propTypes = {
  addProject: PropTypes.func,
  categories: PropTypes.array
}

export default AddProject
