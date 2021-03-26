const { Router } = require('express')
const auth = require('../middleware/authorization')

const router = Router()

router.get('/authorize-user', auth, (req, res) => {
    res.status(200).send('User is authenticated')
})

module.exports = router