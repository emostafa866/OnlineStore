const mongoose = require('mongoose')
const db_url = 'mongodb://localhost:27017/onlineStore'
const product_schema = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    image: String
})
const product = mongoose.model('product', product_schema)
exports.Product = product;

exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(db_url).then(() => {
            return product.find()
        }).then(products => {
            mongoose.disconnect()
            resolve(products)

        }).catch(err => reject(err))
    })

};
exports.productbycategory = (category) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(db_url).then(() => {
            return product.find({ category: category })
        }).then(products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err))
    })
};
exports.productbyId = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(db_url).then(() => {
            return product.findById(id)
        }).then(product => {
            mongoose.disconnect()
            resolve(product)
        }).catch(err => reject(err))
    })
};


