const http = require('http')
const app = require('./app')
const logger = require('./logger')

const port = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(port, () => {
  logger.info(`Listening on port ${port}`)
})