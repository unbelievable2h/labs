const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()
const auth = require('../middleware/auth.middleware')

router.post('/write', auth, async (req, res) => {
  try{
      if (req.user.userId != '61c2204d6f8d1bbf37fd28a5'){
        res.status(500).json({message: 'Вы не можете делать записи'})
      } else {

        const {number_order, send_point, ship_address,status} = req.body

        const link = new Link({
          number_order, send_point, ship_address,status
        })
        await link.save()

        res.status(201).json({ link })
      }
   } catch (e){
     console.log(e)
     res.status(500).json({message: 'Something wrong'})
   }
})
router.get('/', async (req, res) => {
    try{
        const links = await Link.find({}) //????
        res.json(links)
     } catch (e){
       console.log(e)
       res.status(500).json({message: 'Something wrong'})
     }
})

router.get('/:id', async (req, res) => {
    try{
        const link = await Link.findById(req.params.id) 
        res.json(link)
     } catch (e){
       console.log(e)
       res.status(500).json({message: 'Something wrong'})
     }
})

module.exports = router