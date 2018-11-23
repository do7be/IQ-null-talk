const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
  res.render('index', { title: 'IQ NULL TALK', message: 'IQ NULL TALK' })
})

module.exports = router
