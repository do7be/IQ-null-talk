const request = require('request-promise')
const express = require('express')
const router = express.Router()

router.post('/', async function(req, res) {
  const { text } = req.body

  const result = await request.post({
    uri: 'https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk',
    formData: {
      apikey: 'DZZ4jWMp1AdYWuy9Qoq2O0XwD8oqwZde',
      query: text
    }
  })
  const resultObject = JSON.parse(result)
  const reply = resultObject.results ? resultObject.results[0].reply : 'わかりません'

  const result2 = await request.post({
    uri: 'https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk',
    formData: {
      apikey: 'DZZ4jWMp1AdYWuy9Qoq2O0XwD8oqwZde',
      query: reply
    }
  })
  const resultObject2 = JSON.parse(result2)
  const yourReply = resultObject2.results ? resultObject2.results[0].reply : 'わかりません'

  const response = {
    reply,
    yourReply
  }
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(response))
})

module.exports = router
