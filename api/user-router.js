const express = require('express')
const User = require('../models/user')
const router = express.Router()
const bcrypt = require('bcrypt')

router.post('/users', async (req, res) => {
    const { email, password, name } = req.body
    const duplicateUser = await User.findOne({ email })
    console.log(duplicateUser, 'user')

    if (duplicateUser) {
        return res.status(400).send({ error: 'Email exists.' })
    }

    bcrypt.hash(password, 10, async function(err, hash) {
        if (err) {
            return res.status(500).send({ error: 'Something went wrong. Please try again later' })
        }
        try {
            const user = new User({
                email,
                password: hash,
                name
            })
            await user.save()
            res.status(201).send(user)
        } catch (e) {
            res.status(500).send()
        }
    });
})

module.exports = router