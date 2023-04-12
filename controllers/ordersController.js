const db = require('../models/db');

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await db.Order.findAll();
        // convert menuList and addons json string in orders to json object
        orders.forEach(order => {
            order.menuList = JSON.parse(order.menuList);
            order.addons = JSON.parse(order.addons);
        });
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}

const getOrder = async (req, res, next) => {
    try {
        const order = await db.Order.findOne({ where: { orderId: req.body.orderId } });
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
}

const getRestaurantOrders = async (req, res, next) => {
    try {
        const orders = await db.Order.findAll({ where: { restaurantId: req.body.restaurantId } });
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}

const getBranchOrders = async (req, res, next) => {
    try {
        const orders = await db.Order.findAll({ where: { branchId: req.body.branchId } });
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}

const getTableOrders = async (req, res, next) => {
    try {
        const orders = await db.Order.findAll({ where: { tableId: req.body.tableId } });
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}

// get branch orders by status
const getBranchOrdersByStatus = async (req, res, next) => {
    console.log("req.body::::::::::", req.body)
    try {
        const orders = await db.Order.findAll({ where: { branchId: req.body.branchId, status: req.body.status } });
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}

// get table orders by status
const getTableOrdersByStatus = async (req, res, next) => {
    try {
        const orders = await db.Order.findAll({ where: { tableId: req.body.tableId, status: req.body.status } });
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}

// get restaurant orders by status
const getRestaurantOrdersByStatus = async (req, res, next) => {
    try {
        const orders = await db.Order.findAll({ where: { restaurantId: req.body.restaurantId, status: req.body.status } });
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}

// get branch orders by date
const getBranchOrdersByDate = async (req, res, next) => {
    try {
        const orders = await db.Order.findAll({ where: { branchId: req.body.branchId, createdAt: req.body.date } });
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}

// get table orders by date
const getTableOrdersByDate = async (req, res, next) => {
    try {
        const orders = await db.Order.findAll({ where: { tableId: req.body.tableId, createdAt: req.body.date } });
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}

// get restaurant orders by date
const getRestaurantOrdersByDate = async (req, res, next) => {
    try {
        const orders = await db.Order.findAll({ where: { restaurantId: req.body.restaurantId, createdAt: req.body.date } });
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}

// get branch orders by date and status
const getBranchOrdersByDateAndStatus = async (req, res, next) => {
    try {
        const orders = await db.Order.findAll({ where: { branchId: req.body.branchId, createdAt: req.body.date, status: req.body.status } });
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}

// get table orders by date and status
const getTableOrdersByDateAndStatus = async (req, res, next) => {
    try {
        const orders = await db.Order.findAll({ where: { tableId: req.body.tableId, createdAt: req.body.date, status: req.body.status } });
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}

// get restaurant orders by date and status
const getRestaurantOrdersByDateAndStatus = async (req, res, next) => {
    try {
        const orders = await db.Order.findAll({ where: { restaurantId: req.body.restaurantId, createdAt: req.body.date, status: req.body.status } });
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}

const createOrder = async (req, res, next) => {
    try {
        // convert menuList and addons in req.body to JSON string
        // req.body.menuList = JSON.stringify(req.body.menuList);
        // req.body.addons = JSON.stringify(req.body.addons);
        console.log(req.body)

        const order = await db.Order.create(req.body);
        
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
}

const updateOrder = async (req, res, next) => {
    try {
        const order = await db.Order.update(req.body, { where: { orderId: req.body.orderId } });
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
}

const deleteOrder = async (req, res, next) => {
    try {
        const order = await db.Order.destroy({ where: { orderId: req.body.orderId } });
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllOrders,
    getOrder,
    getRestaurantOrders,
    getBranchOrders,
    getTableOrders,
    getBranchOrdersByStatus,
    getTableOrdersByStatus,
    getRestaurantOrdersByStatus,
    getBranchOrdersByDate,
    getTableOrdersByDate,
    getRestaurantOrdersByDate,
    getBranchOrdersByDateAndStatus,
    getTableOrdersByDateAndStatus,
    getRestaurantOrdersByDateAndStatus,
    createOrder,
    updateOrder,
    deleteOrder
}

