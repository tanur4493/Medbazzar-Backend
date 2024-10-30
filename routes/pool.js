var mysql = require('mysql')
var pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'VIKRANT',
    database: 'medbazzar',
    multipleStatements: true,
    
})
module.exports = pool;