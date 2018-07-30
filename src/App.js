import React, { Component } from 'react'
import uuid from 'uuid'
// import $ from 'jquery'
import { NavLink, BrowserRouter, Route } from 'react-router-dom'
import * as services from './services/services.js'
import Chart from './components/chart.js'
import TitleSquare from './components/title-square.jsx'
import Projects from './components/Projects'
import AddProject from './components/AddProject'
import Todos from './components/Todo'
import './App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      todos: [],
      // pathData: []
      state: true
    }
  }

  async getTodos() {
    let list = await fetch('https://jsonplaceholder.typicode.com/todos')
    let result = await list.json()
    return result
  }

  getProjects() {
    this.setState({
      projects: [
        {
          id: uuid.v4(),
          title: 'Business Website',
          category: 'Web Deisgn'
        },
        {
          id: uuid.v4(),
          title: 'Social Website',
          category: 'Mobile Development'
        },
        {
          id: uuid.v4(),
          title: 'Ecommerce Shopping Cart',
          category: 'Web Development'
        }
      ]
    })
  }

  getPathData () {
    // this.setState({
    //   pathData: [
    //     {date: new Date(1528041600000), value: 35},
    //     {date: new Date(1528051600000), value: 80},
    //     {date: new Date(1528061600000), value: 200},
    //     {date: new Date(1528071600000), value: 150},
    //     {date: new Date(1528081600000), value: 400},
    //     {date: new Date(1528091600000), value: 50},
    //     {date: new Date(1528101600000), value: 450},
    //     {date: new Date(1528111600000), value: 5}
    //   ]
    // })
  }

  async componentWillMount() {
    let result = await services.queryTimeChart(111111111)
    console.log(result)
    this.getProjects()
    this.getPathData()
  }

  async componentDidMount() {
    let result = await this.getTodos()
    this.setState({todos: result.slice(0, 10)}, function() {
      console.log('this is new data')
    })
  }

  handleAddProject(project) {
    console.log(project)
    let projects = this.state.projects
    projects.push(project)
    this.setState({projects: projects})
  }

  handleDeleteProject(id) {
    let projects = this.state.projects
    let index = projects.findIndex(x => x.id === id)
    projects.splice(index, 1)
    this.setState({projects: projects})
  }

  clickFn () {
    // this.setState.state = !this.state.state
    // console.log(this.state.state)
  }

  Home () {
    return <h1>home</h1>
  }

  Contact () {
    return <h1>contact</h1>
  }

  app () {
    return (
      <div>
        <NavLink to="/" exact activeClassName="active">Home</NavLink>
        <NavLink to="/contact" activeClassName="active">Contact</NavLink>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="body">
          <div className="block">
            <Chart />
          </div>
          <div className="block">
            <TitleSquare />
            <hr />
            <Todos todos={this.state.todos}/>
          </div>
          <div className="block"  onClick={this.clickFn.bind(this)}>
            <p>this is test react router</p>
            <BrowserRouter>
              <div>
                <Route component={this.app} />
                <Route path="/" exact component={this.Home} />
                <Route path="/contact" component={this.Contact} />
              </div>
            </BrowserRouter>
            <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
          </div>
          <div className="block">
            <AddProject addProject={this.handleAddProject.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
