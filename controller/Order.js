const orderModel = require('../model/Order')
const userModel = require('../model/User')
const objectId = require('mongoose').Types.ObjectId
const { requestResponse } = require('../config/message')

exports.updateData = (id, data) => 
  new Promise((resolve, reject) => {
    try {
      orderModel.updateOne({
        _id: objectId(id)
      }, data)
      .then(() => resolve(requestResponse.sukses('Berhasil Mengupdate Barang')))
      .catch(() => reject(requesrResponse.serverError))
    } catch (err) {
      console.log(err)
    }
  })

exports.getData = (id) =>
  new Promise((resolve, reject) => {
    try {
      userModel.findOne({
        _id: objectId(id)
      }).then(() => {
        orderModel.findOne({
          status: 1
        }).then((barang) => {
          if (barang) {
            resolve(requestResponse.sukseswithdata('Berhasil Mendapatkan Data', barang))
          } else {
            orderModel.create({
              idUser: objectId(id),
              idBarang: '',
              harga: '',
              jumlah: '',
              status: 1
            }).then((barang) => resolve(requestResponse.sukseswithdata('Berhasil Membuat Data', barang)))
            .catch(() => reject(requestResponse.gagal('Gagal Membuat Barang')))
            
          }
          })
          .catch(() => reject(requestResponse.gagal('Gagal Mendapatkan Barang')))
      }).catch(() => reject(requestResponse.gagal('Gagal mendapatkan User')))
    } catch (err) {
      console.log(err)
    }
  })

exports.getPesanan = (id) =>
  new Promise((resolve, reject) => {
    try {
      orderModel.findOne({
        idUser: objectId(id)
      }).then((barang) => {
        if (barang) {
          resolve(requestResponse.sukseswithdata('Berhasil Mendapatkan Pesanan', barang))
        } else {
          reject(requestResponse.gagal('Gagal Mendapatkan Pesanan'))
        }
      }).catch((err) => reject(requestResponse.serverError))
    } catch (error) {
      console.log(error)
    }
  })