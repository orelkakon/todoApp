const express = require('express')
const cors = require('cors')
const sql = require('mysql')

const connection = sql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '207772922',
    database: 'orelk',
})

const app = express();
app.use(cors())
app.use(express.json())


// get all tasks
app.get('/tasks', (req, res) => {
    const SELECT_ALL_TASKS = 'SELECT * from tasks';
    connection.query(SELECT_ALL_TASKS, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
//mark task as a done
app.get('/marktask/:task', (req, res) => {
    console.log('here2')
    const MARK_TASK = `UPDATE tasks SET isdone = 1 WHERE (taskid = ${req.params.task});`
    console.log(MARK_TASK)
    connection.query(MARK_TASK, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

// add task
app.get('/addtask', (req, res) => {
    console.log(req.query.tasks,'req.query.tasks')
    const ADD_TASK = `INSERT INTO tasks (tasks) VALUES (${req.query.tasks})`;
    connection.query(ADD_TASK, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send('added')
        }       
    })
})

app.delete('/task/:task', (req,res)=>{
    const DELETE_TASK = `DELETE FROM tasks WHERE (taskid = ${req.params.task});`
    connection.query(DELETE_TASK,(err, result)=>{
        if (err) {
            console.log(err)
        } else {
            res.send('delted')
        } 
    })      
})

app.listen(3001, () => {
    console.log('server up')
})