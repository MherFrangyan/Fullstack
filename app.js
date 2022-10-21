const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
// package
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const morgan = require('morgan')
const key = require('./configs/keys')

const authRoute = require('./routes/auth')
const orderRoute = require('./routes/order')
const categoryRoute = require('./routes/category')
const positionRoute = require('./routes/position')
const analyticsRoute = require('./routes/analytics')
const app = express()

mongoose.connect(key.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error))


app.use(passport.initialize())
require('./middlewares/passport')(passport)
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoute)
app.use('/api/order', orderRoute)
app.use('/api/category', categoryRoute)
app.use('/api/position', positionRoute)
app.use('/api/analytics', analyticsRoute)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'))

    app.get('*', (req,res) => {
        res.sendFile(
            path.resolve(
                __dirname, 'dist', 'client', 'index.html'
            )
        )
    })

}


module.exports = app;
