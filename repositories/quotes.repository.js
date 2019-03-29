const mysql = require('mysql')
const util = require('util')

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB, 
})
connection.connect()
connection.query = util.promisify(connection.query)

const QuotesRepository = {
  findAll: ({ limit, startDate, endDate, hash }) => {
    const query = `
      SELECT base, quote, bid, ask, createdAt, val AS hash FROM Quote, Hash 
      WHERE hash_id IN (SELECT * FROM (SELECT DISTINCT hash_id FROM Quote ORDER BY hash_id DESC LIMIT ?) tmp)
      AND Quote.hash_id = Hash.id
      AND createdAt >= ?
      AND createdAt <= ?
      AND val LIKE 
    ` + connection.escape(hash + '%')
    const sql =  mysql.format(query, [limit, startDate, endDate])

    return connection.query(sql)
  }
}

module.exports = QuotesRepository