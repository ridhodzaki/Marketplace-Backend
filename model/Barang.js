const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BarangSchema = new Schema ({
  namabarang: {
    type: String
  },
  hargabarang: {
    type: Number
  },
  stok: {
    type: Number
  },
  jenis: {
    type: String
  },
  keterangan: {
    type: String
  },
  image: {
    type: String
  },
  detail:{
    type: String
  },
  ulasan: [{
    idUser: String,
    ulasan: String
  }]
})

module.exports = mongoose.model('barang', BarangSchema)