const uuidv4 = require('uuid/v4')

function cookieAgent(req, res, next) {
  const rtuid = { ...req.cookies.rtuid }
  if (rtuid === undefined) {
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
