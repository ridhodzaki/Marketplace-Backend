const orderModel = require('../model/Order')
const userModel = require('../model/User')
const objectId = require('mongoose').Types.ObjectId
const { requestResponse } = require('../config/message')

exports.updateData = (id, data) => 
  new Promise((resolve, reject) => {
    console.log(id)
    console.log(data)
    try {
      orderModel.updateOne({
        idUser: objectId(id),
        status: 1
      }, data)
      .then(() => resolve(requestResponse.sukses('Berhasil Mengupdate Barang')))
      .catch(() => reject(requesrResponse.serverError))
    } catch (err) {
      console.log(err)
    }
  })

exports.getAll = () => {
  new Promise((resolve, reject) => {
    try {
      orderModel.aggregate([
        {
          $match: {
            level: 2
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "idUSer",
            foreignField: "_id",
            as: "dataUser"
          }
        },
      ]).then((order) => {
        resolve(requestResponse.sukseswithdata('Succes Get Order', order))
      }).catch(() => reject(requestResponse.serverError()))
    } catch (err) {
      console.log(err)
    }
  })
}

exports.getData = (id) =>
  new Promise((resolve, reject) => {
    try {
      orderModel.findOne({
        idUser: objectId(id),
        status: 1,
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
    } catch (err) {
      console.log(err)
    }
  })

exports.getPesanan = (id) =>
  new Promise((resolve, reject) => {
    try {
      orderModel.findOne({
        idUser: objectId(id),
        status: 1
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