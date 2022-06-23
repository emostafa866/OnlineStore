const express = require('express')
const path = require('path')
const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)
const { gethome } = require('./controllers/home_controller')
const { getAllProducts, productbycategory } = require('./models/home_model')
const homeRouter = require('./routes/home_route')
const productRouter = require('./routes/product_route')
const authRouter = require('./routes/auth_route')
const cartRouter = require('./routes/cart_route')
const adminRouter = require('./routes/admin_route')
const { Session } = require('express-session')
const flash = require('connect-flash')
const check = require('express-validator').check

const app = express()

const Store = new SessionStore({
    uri: 'mongodb://localhost:27017/onlineStore',
    collection: 'sessions'
});

app.use(session({
    secret: 'i love success',
    resave: true,
    saveUninitialized: false,
    store: Store
}))

app.use(flash());
app.use(check())
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'photos')))

app.set('view engine', 'ejs')
app.set('views')

app.use('/', homeRouter)
app.use('/product', productRouter)
app.use('/', authRouter)
app.use('/cart', cartRouter)
app.use('/admin', adminRouter )

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    console.log('server listened on port 3000')


})