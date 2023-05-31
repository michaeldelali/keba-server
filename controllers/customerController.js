const router = require('express').Router()
const db = require('../models/db')

// view branch menu by view
const viewBranchMenuByView = async (req, res, next) => {    
    try {
        const menu = await db.Menu.findAll({
            where: {
                branchId: req.body.branchId,
                view: 'true'
            }
        });
        res.status(200).json(menu);
    } catch (err) {
        next(err);
    }
}

// view branch info 
const viewBranchInfo = async (req, res, next) => {
    try {
        const branch = await db.Branch.findOne({ where: { branchId: req.body.branchId } });
        res.status(200).json(branch);
    } catch (err) {
        next(err);
    }
}

const createOrder = async (req, res, next) => {
    try {
        const order = await db.Order.create({
            userId: req.body.userId,
            branchId: req.body.branchId,
            tableId: req.body.tableId,
            restaurantId: req.body.restaurantId,
            menuList: req.body.menuList,
            status: 'pending',
            totalPrice: req.body.totalPrice,
            orderDetails: req.body.orderDetails
        });
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
}

// generate order id for customer by date, time and branch id
const generateOrderId = ()=>{
    const date = new Date();
    const year = date.getFullYear().toString().slice(2);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return year + month + day + hour + min + sec;
}

module.exports = {
    viewBranchMenuByView,
    viewBranchInfo,
    createOrder,
    generateOrderId
}