const barangModel = require('../model/Barang')
const objectId = require('mongoose').Types.ObjectId
const { requestResponse } = require('../config/message')
const { deleteImage } = require('../config/uploadConfig')

exports.input = (data) =>
  new Promise((resolve, reject) => {
    barangModel.findOne({
      namabarang: data.namabarang
    }).then((barang) => {
      if (barang) {
        reject(requestResponse.gagal('Barang Telah Terdaftar'))
      } else {
        barangModel.create(data)
        .then(() => resolve(requestResponse.sukses('Barang Berhasil Terdaftar')))
        .catch(() => reject(requestResponse.gagal('Gagal Menambahkan Barang')))
      }
    }).catch(() => reject(requestResponse.serverError))
  })

exports.getAllBarang = () =>
  new Promise((resolve, reject) => {
    barangModel.find({})
    .then((barang) => {
      if (barang) {
        resolve(requestResponse.sukseswithdata('Barang Berhasil Didapatkan', barang))
      } else {
        reject(requestResponse.gagal('Gagal Mendapatkan Barang'))
      }
    })
    .catch(() => reject(requestResponse.serverError))
  })

exports.getOneBarang = (id) =>
  new Promise((resolve, reject) => {
    barangModel.findOne({
      _id: objectId(id)
    })
    .then((barang) => {
      if (barang) {
        resolve(requestResponse.sukseswithdata('Barang Berhasil Didapatkan', barang))
      } else {
        reject(requestResponse.gagal('Gagal Mendapatkan Barang'))
      }
    })
    .catch(() => reject(requestResponse.serverError))
  })

exports.updateBarang = (id, data, changeImage) =>
  new Promise((resolve, reject) => {
    barangModel.updateOne({
      _id: objectId(id)
    }, data)
      .then((barang) => {
        if (changeImage) {
          deleteImage(data.oldImage)
        }
        resolve(requestResponse.sukseswithdata('Berhasil Mengubah Barang', barang))
      })
      .catch(() => reject(requestResponse.gagal('Gagal Mengubah Barang')))
  })

exports.deleteBarang = (id) =>
  new Promise((resolve, reject) => {
    barangModel.findOne({
      _id: objectId(id)
    }).then((barang) => {
      console.log(barang)
      barangModel.deleteOne({
        _id: objectId(id)
      })
      .then(() => {
        deleteImage(barang.image)
        resolve(requestResponse.sukses('Berhasil Hapus Barang'))
      })
      .catch(() => reject(requestResponse.gagal('Gagal Hapus Barang')))
    })
  })