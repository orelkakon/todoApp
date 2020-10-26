import React from 'react'
import TodoList from './TodoList';
const config = require('./config')
const urls = require('./urls')

class TaskManager extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            task: '',
            taskList: []
        }
    }
    
    componentDidMount() {
        this.getTaskList()
    }

    onSubmitClick = () => {
        fetch(`http://${config.host}:${config.port}${urls.addTask}='${this.state.task}'`)
        .then(this.getTaskList)
        .then(this.setState({task: ''}))   
    }

    getTaskList = () => {
        fetch(`http://${config.host}:${config.port}${urls.getList}`)
            .then(response => response.json())
            .then(response => this.setState({ taskList: response }))
    }
    
    onDoneClick = (task) => {
        fetch(`http://${config.host}:${config.port}${urls.markTask}${task.taskid}`)
        .then(this.getTaskList)    
    }

    onDeleteAll = () => {
        fetch(`http://${config.host}:${config.port}${urls.deleteAllTasks}`, {
            method: 'DELETE',
        }).then(this.getTaskList)
    }

    onDeleteClick = (taskid) => {
        fetch(`http://${config.host}:${config.port}${urls.deleteTask}${taskid}`, {
            method: 'DELETE',
        }).then(this.getTaskList)
    }
    
    render() {
        console.log(this.state.taskList)

        return (
            <div>
                <h1>Please add your tasks:</h1>
                <div className="ui input">
                    <input type='text' value={this.state.task} onChange={e => this.setState({ task: e.target.value })} placeholder='your task...'></input>
                </div>
                <br/>
                <br/>
                <button className="ui primary basic button" disabled={!this.state.task} onClick={() => this.onSubmitClick()}>Add Task</button>
                <hr/>
                <button className="delete all button" onClick={() => this.onDeleteAll()}>Delete all tasks!</button>
                <h3 style={{textDecorationLine: 'underline'}}>Task List:</h3>
                <TodoList tasksList = {this.state.taskList} onDeleteClick = {this.onDeleteClick} onDoneClick = {this.onDoneClick}/>
            </div>
        )
    }
}
export default TaskManager