const router = require('express').Router()
const orderController = require('../controller/Order')

router.get('/testing', (req, res) => {
  res.send('Hello World, /n Access To Backend Successfully')
})

router.put('/updateTransaksi/:id', (req, res) => {
  orderController.updateData(req.params.id, req.body)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.get('/getAll', (req, res) => {
  orderController.getAll()
  .then(result => res.json(result))
  .catch(err =>  res.json(err))
})

router.get('/getData/:id', (req, res) => {
  orderController.getData(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.get('/getPesanan/:id', (req, res) =>{
  orderController.getPesanan(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

module.exports = router