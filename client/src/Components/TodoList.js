import React from 'react';
import Display from './TodoItem' 


const TodoList = (props) => {
    return (
        <div className="ui cards" >
        {
            props.tasksList.map(task => 
                <div className="card">
                    {<Display task = {task} onDeleteClick = {props.onDeleteClick} onDoneClick = {props.onDoneClick}/>}
                </div>    
            )
        }
        </div>
    );
};

export default TodoList;