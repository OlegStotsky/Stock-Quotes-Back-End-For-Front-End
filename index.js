const http = require('http')
const app = require('./app')
const socketio = require('socket.io')
const logger = require('./logger')
const amqplib = require('amqplib')
const QuotesSubscription = require('./subscribers/QuotesSubscription')

const port = process.env.PORT || 3000
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', socket => {
  amqplib.connect('amqp://quotes-message-queue').then(rabbitMQConnection => {
    const quotesSubscription = new QuotesSubscription(rabbitMQConnection)
  
    quotesSubscription.init()

    quotesSubscription.on('new_quotes', quotes => {
      socket.emit('new_quotes', quotes)
    })
  })
})

server.listen(port, () => {
  logger.info(`Listening on port ${port}`)
})