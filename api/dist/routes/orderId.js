"use strict";
// import('dotenv').config();
// const Razorpay = require('razorpay');
// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_ID,
//     key_secret: process.env.RAZORPAY_SECRET
// });
// const createOrderId = async(req, res) =>{
//     const {amount} = req.body;
//     const options = {
//         amount: amount*100,  
//         currency: 'INR',
//         receipt: 'receipt_order_74394',
//         payment_capture: 1
//     };
//     try {
//         const response = await razorpay.orders.create(options);
//         console.log("success");
//         return res.json(response);
//     } catch (error) {
//         console.log("error");
//         return res.json(error);
//     }
// };
// module.exports = {createOrderId};
