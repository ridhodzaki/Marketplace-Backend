const userModel = require('../model/User')
const objectId = require('mongoose').Types.ObjectId
const bcrypt = require('bcrypt')
const { requestResponse } = require('../config/message')

exports.register = (data) =>
  new Promise((resolve, reject) => {
    userModel.findOne({
      username: data.username
    }).then(user => {
      if (user) {
        reject(requestResponse.gagal('Username Telah Terdaftar'))
      } else {
        bcrypt.hash(data.password, 10, (err, hash) => {
          data.password = hash
          userModel.create(data)
          .then(() => resolve(requestResponse.sukses('Berhasil Register User')))
          .catch(() => reject(requestResponse.gagal('Gagal Register User')))
        })
      }
    }).catch(() => reject(requestResponse.serverError))
  })

exports.login = (data) =>
  new Promise((resolve, reject) => {
    userModel.findOne({
      username: data.username
    }).then((user) => {
      if (user) {
        if (bcrypt.compareSync(data.password, user.password)) {
          resolve(requestResponse.sukseswithdata('Berhasil Login', user))
        } else {
          reject(requestResponse.gagal('Password Salah'))
        }
      } else {
        reject(requestResponse.gagal('Username Tidak Terdaftar'))
      }
    })
  })

exports.getUser = (data) =>
  new Promise((resolve, reject) => {
    userModel.find({
      level: 2,
    })
    .then((user) => {
      if (user) {
        resolve(requestResponse.sukseswithdata('Berhasil Mendapatkan Data', user))
      } else {
        reject(requestResponse.gagal('Gagal Mendapatkan Data'))
      }
    })
    .catch(() => reject(requestResponse.serverError))
  })

exports.getOneUser = (id) =>
  new Promise((resolve, reject) =>{
    userModel.findOne({
      _id: objectId(id)
    }).then((user) => {
      if (user) {
        resolve(requestResponse.sukseswithdata('Berhasil Mendapatkan Satu User', user))
      } else {
        reject(requestResponse.gagal('Gagal Mendapatkan Data'))
      }
    })
    .catch(() => reject(requestResponse.serverError))
  })

exports.UpdateUser = (id, data) =>
  new Promise((resolve, reject) => {
    userModel.updateOne({
      _id: objectId(id)
    }, data)
    .then((user) => {
      if (user) {
        resolve(requestResponse.sukseswithdata('Berhasil Mengupdate User', user))
      } else {
        reject(requestResponse.gagal('Gagal Mendapatkan Data'))
      }
    })
    .catch(() => reject(requestResponse.serverError))
  })

exports.DeleteOne = (id) =>
  new Promise((resolve, reject) => {
    userModel.findOne({
      _id: objectId(id)
    }).then(() => {
      userModel.deleteOne({
        _id: objectId(id)
      })
      .then(() => resolve(requestResponse.sukses('Berhasil Menghapus User')))
      .catch(() => reject(requestResponse.serverError))
    })
  })


exports.findUser = (nama) =>
  new Promise((resolve, reject) => {
    userModel.findOne({
      name: nama
    })
    .then((data) => resolve(requestResponse.sukseswithdata('Berhasil Mendapatkan User', data)))
    .catch(() => reject(requestResponse.serverError))
  })