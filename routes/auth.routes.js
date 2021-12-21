const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/user')
const router = Router()

// /api/auth/register
router.post('/register',
[
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Uncorrect length of password. Min 6.').isLength({min: 6})
],
 async (req, res) => {
    try{

      const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json(
                {
                    errors: errors.array(),
                    message: 'Uncorrect registration data'
                }
            )
        }

      const {email, password} = req.body
      const candidate = await User.findOne({email})
      if (candidate) {
        return  res.status(400).json({message: 'This user already has registred'})
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User ({email, password: hashedPassword})

      await user.save()

      res.status(201).json({message: 'User was create'})
    } catch (e){
      res.status(500).json({message: 'Something wrong'})
    }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Write correct email').normalizeEmail().isEmail(),
        check('password', 'Write a password').exists()
    ],
 async (req, res) => {
    try{
         const errors = validationResult(req)
  
          if (!errors.isEmpty()) {
              return res.status(400).json(
                  {
                      errors: errors.array(),
                      message: 'Uncorrect login data'
                  }
              )
          }
  
        const {email, password} = req.body

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message: 'User has not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(400).json({message: 'Uncorrect password'})
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.json({ token, userId: user.id })
      } catch (e){
        console.log(e)
        res.status(500).json({message: 'Something wrong'})
      }
})

module.exports = router