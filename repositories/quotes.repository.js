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
  findAll: ({ limit, startDate, endDate }) => {
    const query = `
      SELECT base, quote, bid, ask, createdAt, val AS hash FROM Quote, Hash 
      WHERE hash_id IN (SELECT * FROM (SELECT DISTINCT hash_id FROM Quote ORDER BY hash_id DESC LIMIT ?) tmp)
      AND Quote.hash_id = Hash.id
      AND createdAt >= ?
      AND createdAt <= ?
    `
    const sql =  mysql.format(query, [limit, startDate, endDate])

    return connection.query(sql)
  }
}

module.exports = QuotesRepository