import React, { useState, useCallback, useEffect } from 'react'
import TaskList from './taskList'
//CR: Remove unneccesary imports from code

//CR: Classes are old syntax, use functions and hooks
class TaskManager extends React.Component {
    //CR: initial state should be in constructor
    state = {
        task: '',
        taskList: [],
        backgroundColor2 : 'white',
        backgroundColor1 : 'yellow'
    }        
    
    componentDidMount() {
        this.getTaskList()
    }

    //CR: Use async await or then!
    onSubmitClick = () => {
        //CR: Add routes to config
        fetch(`http://localhost:3001/addtask?tasks='${this.state.task}'`)
        this.getTaskList()
        this.setState({task: ''})
    }

    //CR: NICE!
    getTaskList = () => {
        fetch('http://localhost:3001/tasks')
            .then(response => response.json())
            .then(response => this.setState({ taskList: response }))
    }
    
    //CR: Never call componentDidMount by yourself, instead call this.getTaskList()
    onDoneClick = (task) => {
        fetch(`http://localhost:3001/marktask/${task.taskid}`)
        this.componentDidMount()
    }

    onDeleteAll = () => {
        //CR: Foreach!
        //CR: Too many fetch requests
        this.state.taskList.map( task => this.onDeleteClick(task.taskid) )
    }

    //CR: Await
    onDeleteClick = (taskid) => {
        fetch(`http://localhost:3001/task/${taskid}`, {
            method: 'DELETE',
        })
        this.getTaskList()
    }

    //CR: Divide to components, Thinking in react
    render() {
        console.log(this.state.taskList)
        const styles = {
            containerStyle: {
              backgroundColor: this.state.backgroundColor1
            }
        };
        const { containerStyle } = styles;
        
        const styles2 = {
            containerStyleRegular: {
              backgroundColor: this.state.backgroundColor2
            }
        };
        const { containerStyleRegular } = styles2;
        return (
            <div>
                <h1>Please add your tasks:</h1>
                <div className="ui input">
                    <input type='text' value={this.state.task} onChange={e => this.setState({ task: e.target.value })} placeholder='your task...'></input>
                </div>
                <button className="ui primary basic button" disabled={!this.state.task} onClick={() => this.onSubmitClick()}>Add Task</button>
                <hr/>
                <button className="delete all button" onClick={() => this.onDeleteAll()}>Delete all tasks!</button>
                <h3>Task List:</h3>
                <div className="ui cards" >
                    {
                        this.state.taskList.map(task => <div className="card" >
                            <div className="content" style= { task.isdone == '1' ? containerStyle : containerStyleRegular }>
                                <div className="description" >
                                    {task.tasks}
                                </div>
                            </div>
                            <div className="extra content">
                                <div className="ui two buttons">
                                    <div className="ui basic green button" onClick={() => this.onDoneClick(task)}>Done</div>
                                    <div className="ui basic red button" onClick={() => this.onDeleteClick(task.taskid)}>Delete</div>
                                </div>
                            </div>
                        </div>
                        
                        )
                    }
                </div>
            </div>
        )
    }
}

export default TaskManager