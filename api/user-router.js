const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middleware/authorization')

router.post('/signup', async (req, res) => {
    const { email, password, name } = req.body
    const duplicateUser = await User.findOne({ email })

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
            const token = jwt.sign({ 
                _id: user._id,
                name: user.name 
            }, process.env.PRIVATE_KEY, { expiresIn: '1 year' })
            res.cookie('jwt-token', token)
            res.status(201).send(user)
        } catch (e) {
            res.status(500).send()
        }
    });
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    
    if (!user) {
        return res.status(401).send({ error: 'Wrong credentials.'})
    }
    const match = await bcrypt.compare(password, user.password);

    if(match) {
        const token = jwt.sign({
            _id: user._id,
            name: user.name
        }, process.env.PRIVATE_KEY, { expiresIn: '1 year' })
        res.cookie('jwt-token', token)

        return res.status(200).send(user)
    } 
    res.status(401).send({ error: 'Wrong credentials.' })
})

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id)
    try {
        res.status(201).send(user)
    } catch (e) {
        res.status(500).send({ error: 'Something went wrong' })
    }
})

router.patch('/edit', async (req, res) => {
    const update = req.body
    try {
        const user = await User.findByIdAndUpdate('604764eb0fc2005241b44f42', update, { new: true } )
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
        
    }
})

router.delete('/delete', async (req, res) => {
    const email = req.body.email
    try {
        const user = await User.findOneAndRemove({ email })
        if (!user) {
            return res.status(404).send({ error: 'Email doesn\'t exists.'})
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send({ error: 'Something went wrong.' })
    }
})

module.exports = router