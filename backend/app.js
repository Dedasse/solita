require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const routeRouter = require('./routes/route')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler');
const {default: mongoose} = require('mongoose');

//middleware
app.use(express.json())

//routes
app.get('/',(req, res) => {
  res.send('<h1>Hello</h1>')
})
app.use('/', routeRouter)

//error route

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    
    console.log(`DB ${mongoose.connection.host} `)
    console.log(`DB ${mongoose.connection.port} `)
    console.log(`DB ${mongoose.connection.db } `)


    app.listen(port, () => console.log(`Server listening port: ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()