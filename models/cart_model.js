const { promise, reject } = require('bcrypt/promises');
const mongoose = require('mongoose')
const db_url = 'mongodb://localhost:27017/onlineStore'
const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productID: String,
});
const cart = mongoose.model('cart', cartSchema)

exports.CreateCart = data => {

    return new Promise((resolve, reject) => {
        mongoose.connect(db_url)
            .then(() => {
                let item = new cart(data)
                return item.save();
            })
            .then(() => {
                mongoose.disconnect();
                resolve()
                console.log('cart created')
            })
            .catch((err) => {
                reject(err)
                console.log('didnt created')
            })
    })
}
exports.viewcart = function (id) {
    console.log('view cart fun now');
    return new Promise((resolve, reject) => {
        mongoose.connect(db_url)
            .then(() => {
                return cart.find({ userId: id });
            }).then(carts => {
                mongoose.disconnect();
                resolve(carts);
                console.log('carts resolved');
            }).catch(err => {
                mongoose.disconnect();
                reject(err);
                console.log(err);
            });
    });
};

exports.editCart = (id, newData) => {
    console.log('editcart fun now');
    return new Promise((resolve, reject) => {
        mongoose.connect(db_url)
            .then(() => {
                return cart.updateOne({ _id: id }, newData)
            })
            .then((carts) => {
                mongoose.disconnect()
                resolve(carts)
                console.log(carts)

            }).catch(err => {
                mongoose.disconnect()
                reject(err)
                console.log(err)

            })
    })
};

exports.DeleteCart = (id) => {
    console.log('deletecart fun now');
    return new Promise((resolve, reject) => {
        mongoose.connect(db_url)
            .then(() => {
                return cart.findByIdAndDelete(id)
            })
            .then((carts) => {
                mongoose.disconnect()
                resolve(carts)
                console.log(carts)

            }).catch(err => {
                mongoose.disconnect()
                reject(err)
                console.log(err)

            })
    })
};