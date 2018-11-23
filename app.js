const express = require('express')
const bodyParser = require('body-parser')
const route = require('./routes')
const apiPost = require('./routes/post')

const app = express()
app.set('view engine', 'pug')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const webpackConfig = require('./webpack.config')
  const compiler = webpack({ mode: 'development', ...webpackConfig })

  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  )
  app.use(require('webpack-hot-middleware')(compiler))
}

app.use('/', route)
app.use('/post', apiPost)

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('App listening on port 3000!'))
