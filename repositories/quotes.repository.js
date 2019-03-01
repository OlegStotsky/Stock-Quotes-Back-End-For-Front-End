const mysql = require('mysql')
const util = require('util')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Quotes',
  insecureAuth: true
})
connection.connect()
connection.query = util.promisify(connection.query)

const QuotesRepository = {
  findAll: ({ limit }) => {
    const query = 'SELECT * FROM Quote WHERE hash_id IN (SELECT * FROM (SELECT DISTINCT hash_id FROM Quote ORDER BY hash_id DESC LIMIT ?) tmp)'
    const sql =  mysql.format(query, limit)

    return connection.query(sql)
  }
}

module.exports = QuotesRepository