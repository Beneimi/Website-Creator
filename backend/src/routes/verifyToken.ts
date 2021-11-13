import * as jwt from 'jsonwebtoken'

export function verifyToken (req, res, next) {
  const token = req.cookies.token
  if (!token) {
    res.status(401).send('Access Denied')
    return
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
  } catch (err) {
    res.status(400).send('Invalid token')
  }
  next()
}
