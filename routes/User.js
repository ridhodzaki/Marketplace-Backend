const router = require('express').Router()
const userController = require('../controller/User')

router.get('/testing', (req, res) => {
  res.send('Hello World, /n Access To Backend Successfully')
})

router.post('/register', (req, res) => {
  userController.register(req.body)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.post('/login', (req, res) => {
  console.log(req.body)
  userController.login(req.body)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.get('/getUser', (req, res) => {
  userController.getUser()
  .then(result => res.json(result))
  .catch(err =>  res.json(err))
})

router.get('/getOneUser/:id', (req, res) => {
  userController.getOneUser(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.put('/updateUser/:id', (req, res) => {
  userController.UpdateUser(req.params.id, req.body)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.delete('/deleteUser/:id', (req, res) => {
  userController.DeleteOne(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.get('/getOneUserByName/:name', (req, res) => {
  userController.findUser(req.params.name)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})


module.exports = router