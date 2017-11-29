const uuidv4 = require('uuid/v4')
const uuidTest = require('uuid-regexp')

function cookieAgent(req, res, next) {
  const { rtuid } = req.cookies
  if ((rtuid === undefined) || (!uuidTest().test(rtuid))) {
    const newUid = uuidv4()
    req.rtuid = newUid
    res.cookie('rtuid', newUid, {
      maxAge: 94670856000,
      httpOnly: true
    })
  } else {
    req.rtuid = rtuid
  }

  next()
}

module.exports = cookieAgent
