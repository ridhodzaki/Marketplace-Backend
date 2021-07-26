const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

// Koneksi Database
const mongoose = require('mongoose')
const mongoUrl = 'mongodb://localhost:27017/latihantani'
mongoose.connect(mongoUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Berhasil Konek Ke Database')
}).catch((err) => {
  console.log('Gagal Konek Ke Database')
})


const directory = path.join(__dirname, '/statics/')
app.use(express.static(directory))

// Cors
app.use(cors())
app.use(bodyParser.json({
  extended: true,
  limit: '20mb'
}))
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '20mb'
}))

// list routes
app.use('/user', require('./routes/User'))
app.use('/barang', require('./routes/Barang'))
app.use('/order', require('./routes/Order'))


app.listen(3000, function() {
  console.log('Server Aktif di port 3000')
})