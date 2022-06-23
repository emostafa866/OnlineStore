const mongoose = require('mongoose');
const db_url = 'mongodb://localhost:27017/onlineStore'
const bcrypt = require('bcrypt');
const { reject } = require('bcrypt/promises');

const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    Admin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('user', UserSchema);

exports.CreateUser = (username, email, pass) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(db_url).then(() => {
            return User.findOne({ email: email })
        }).then(user => {
            if (user) {
                mongoose.disconnect()
                reject('user is already exist')
            }
            else {
                return bcrypt.hash(pass, 10)
            }
        }).then((hashpassword) => {
            let user = new User({
                username: username,
                email: email,
                password: hashpassword
            })
            return user.save()
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
};


exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(db_url).then(() => {
            return User.findOne({ email: email })
        }).then((user) => {
            if (!user) {
                console.log('email isnt exist log')
                reject("email isn't exist")
            } else {
                console.log('check pass')
                bcrypt.compare(password, user.password).then(same => {

                    if (!same) {
                        mongoose.disconnect();
                        reject('wrong password')
                        console.log('not same pass')
                    } else {
                        mongoose.disconnect();
                        resolve({
                            id: user._id,
                            admin: user.Admin,
                        })
                        console.log('email logged')
                    }
                })
            }
        })
    }).catch(err => reject(err))
};
