const { Router } = require('express')
const { auth } = require('../middleware/authorization')

const router = Router()

router.get('/authorize-user', auth, (req, res) => {
    const status = req.user.status
    if (status === 'admin') {
        return res.status(200).send({ message: 'Admin rights', status: 'admin' })
    }
    res.status(200).send({ message: 'User is authenticated', status: 'user' })
})

module.exports = router