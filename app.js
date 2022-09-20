const express = require('express')
// package
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const authRoute = require('./routes/auth')
const orderRoute = require('./routes/order')
const categoryRoute = require('./routes/category')
const positionRoute = require('./routes/position')
const analyticsRoute = require('./routes/analytics')
const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoute)
app.use('/api/order', orderRoute)
app.use('/api/category', categoryRoute)
app.use('/api/position', positionRoute)
app.use('/api/analytics', analyticsRoute)



module.exports = app;
