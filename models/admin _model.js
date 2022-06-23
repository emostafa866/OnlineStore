const mongoose = require('mongoose');
const db_url = 'mongodb://localhost:27017/onlineStore'
const homeModel = require('./home_model')
const Product = homeModel.Product;



exports.AddProduct = data => {
    return new Promise((resolve, reject) => {
        mongoose.connect(db_url).then(() => {
            let item = new Product(data)
            return item.save();
        })
            .then(() => {
                mongoose.disconnect();
                resolve();
                console.log(' product added')
            })
            .catch((err) => {
                mongoose.disconnect();
                reject(err);
                console.log(err);
            })
    })
}