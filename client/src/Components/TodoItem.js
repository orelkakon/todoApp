import React from 'react'

const Display = (props) => {
    var backgroundColor1 ='white';
    var backgroundColor2 ='yellow';

    var styles = {
        containerStyleReg: {
            backgroundColor: backgroundColor1
        }
    };
    var { containerStyleReg } = styles;

    var styles2 = {
        containerStyle: {
            backgroundColor: backgroundColor2
        }
    };
    var { containerStyle } = styles2;
    return (
        <div>
            <div className="content" style= { props.task.isdone == '1' ? containerStyle : containerStyleReg }>
                <div className="description" >
                    {props.task.tasks}
                </div>
            </div>
            <div className="extra content">
                <div className="ui two buttons">
                    <div className="ui basic green button" onClick={() => props.onDoneClick(props.task)}>Done</div>
                    <div className="ui basic red button" onClick={() => props.onDeleteClick(props.task.taskid)}>Delete</div>
                </div>
            </div>
        </div>
    )
}
export default Display;