const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = mongoose.Schema.ObjectId

const OrderSchema = new Schema ({
  idUser: {
    type: objectId
  },
  idBarang: {
    type: String
  },
  harga: {
    type: String
  },
  jumlah: {
    type: String
  },
  status: {
    // 1: Belum verif, 2: Sudah OK, 3: Barang Packing
    type: Number,
    default: 1
  }
})

module.exports = mongoose.model('order', OrderSchema)