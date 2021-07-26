const router = require('express').Router()
const barangController = require('../controller/Barang')
const uploadSetting = require('../config/uploadConfig')
const fields = uploadSetting.upload.fields([
  {
    name: 'image',
    maxCount: 1
  }
])

router.get('/testing', (req, res) => {
  res.send('Hello World, /n Access To Backend Successfully')
})

router.post('/input', fields, (req, res) => {
  const imageName = uploadSetting.cekNull(req.files['image'])

  const data = Object.assign(JSON.parse(req.body.data), {
    image: imageName
  })

  barangController.input(data)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.get('/getBarang', (req, res) => {
  barangController.getAllBarang()
  .then(result => res.json(result))
  .catch(err =>  res.json(err))
})

router.get('/getOneBarang/:id', (req, res) => {
  barangController.getOneBarang(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.post('/updateBarang/:id', (req, res) => {
  imageName = uploadSetting.cekNull(req.body.image)

  let data = JSON.parse(req.body.data)
  let changeImage = false
  if (imageName) {
    changeImage = true
    data = Object.assign(data, {
      image: imageName,
      oldImage: data.image
    })
  }

  barangController.updateBarang(req.params.id, data, changeImage)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.delete('/deleteBarang/:id', (req, res) => {
  console.log(req.params.id)
  barangController.deleteBarang(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})


module.exports = router