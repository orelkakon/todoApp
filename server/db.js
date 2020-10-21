const mysql = require('mysql')

//CR: Config
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '207772922',
    database: 'orelk'
})

module.exports = connection.connect(err => {
    console.log(err)
})