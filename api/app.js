const createError = require('http-errors')
require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const mongoUtil = require('./utils/mongoUtil')
mongoUtil.connectToServer()

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const recipeRouter = require('./routes/recipes')
const searchRouter = require('./routes/search')
const ratingRouter = require('./routes/ratings')
const commentRouter = require('./routes/comments')
const recommendRouter = require('./routes/recommend')

const app = express()

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/recipes', recipeRouter)
app.use('/search', searchRouter)
app.use('/ratings', ratingRouter)
app.use('/comments', commentRouter)
app.use('/recommend', recommendRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
