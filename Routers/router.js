// setup path to resolve request
// 1)import express module
const express=require('express')

// import controller
const usercontroller=require('../controllers/controller')

// import
 const productcontroller=require('../controllers/productcontroller')

// import jwt middleware
 const jwtmiddlewatre = require('../Middlewares/jwtmiddlewares')


 const multerconfig = require('../Middlewares/multermiddleware')






// 2)create an object for router class inside express module

const router=new express.Router()

// 3)setup path to resolve request:
// syntax-router.httprequest
// a)register
// router.post('/user/register',usercontroller.register)

// b)login
router.post('/user/login',usercontroller.login)

// add product
router.post('/products/add',multerconfig.single('image'),productcontroller.addproduct)

// get product
router.get('/product/all-product',productcontroller.GetProduct)






// 4)export router

module.exports=router


