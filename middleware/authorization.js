const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.cookies['jwt-token']
    if (token) {
        jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
            if (err) {
                return res.status(403).send()
            }
            req.user = user
            next()
        })
    } else {
        return res.status(401).send({ error: 'Not authorized' })
    }
}

const adminAuth = (req, res, next) => {
    const status = req.user.status
    console.log(status)

    if (status === 'admin') {
        next()
    } else {
        return res.status(401).send('No permission')
    }
}

module.exports.auth = auth
module.exports.adminAuth = adminAuth