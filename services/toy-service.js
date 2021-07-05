
const fs = require('fs')
const gToys = require('../data/toy.json')


module.exports = {
  query,
  getById,
  remove,
  save,
}

function query() {
  return Promise.resolve(gToys)
}

function getById(toyId) {
  const toy = gToys.find(toy => toy._id === toyId)
  return Promise.resolve(toy)
}

function remove(toyId) {
  const idx = gToys.findIndex(toy => toy._id === toyId)
  if (idx < 0) return Promise.reject(`Didn't find index`)
  gToys.splice(idx, 1)
  return _saveToFile()
}

function save(toyToSave) {
  const { name, price, type, createdAt, inStock } = toyToSave
  const toy = {
    _id: toyToSave._id || _makeId(),
    name,
    price,
    type,
    createdAt,
    inStock
  }
  if (toyToSave._id) {
    const idx = gToys.findIndex(toy => toy._id === toyToSave._id)
    gToys.splice(idx, 1, toy)
  }
  else {
    gToys.unshift(toy)
  }
  return _saveToFile()
    .then(() => {
      return toy
    })
}

function _makeId(length = 5) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var txt = '';
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function _saveToFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile('data/toy.json', JSON.stringify(gToys, null, 2), (err) => {
      if (err) return reject(err)
      resolve();
    })
  })
}