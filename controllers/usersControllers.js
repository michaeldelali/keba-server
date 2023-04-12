var db = require('../models/db');
var bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);


const getAllUsers = async (req, res, next) => {
    try {
        const users = await db.User.findAll();
        users.forEach(user => {
            delete user.dataValues.password;
        });
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const user = await db.User.findOne({ where: { userId: req.body.userId } });
        const result = await user.destroy();
        res.json(result);
    } catch (err) {
        next(err);
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await db.User.findOne({ where: { userId: req.body.userId } });
        user.forEach(user => {
            delete user.dataValues.password;
        });
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

const getRestaurantUsers = async (req, res, next) => {
    try {
        const users = await db.User.findAll({ where: { restaurantId: req.body.restaurantId } });
        // remove password from response
        users.forEach(user => {
            delete user.dataValues.password;
        });
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

const getBranchUsers = async (req, res, next) => {
    try {
        const users = await db.User.findAll({ where: { branchId: req.body.branchId } });
        // remove password from response
        users.forEach(user => {
            delete user.dataValues.password;
        });
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    console.log("Request Body::",req.body)
    try {
        const user = await db.User.findOne({ where: { userId: req.body.userId } });
        if (req.body?.firstname) user.firstname = req.body.firstname;
        if (req.body?.lastname) user.lastname = req.body.lastname;
        if (req.body?.username) user.username = req.body.username;
        if (req.body?.email) user.email = req.body.email;
        if (req.body?.password){
            let hashOut = bcrypt.hashSync(req.body.password, salt);
            user.password = hashOut;
        }
        if (req.body?.roles) user.roles = req.body.roles;
        if (req.body?.restaurantId) user.restaurantId = req.body.restaurantId;
        if (req.body?.branchId) user.branchId = req.body.branchId;
        if (req.body?.status) user.status = req.body.status;
        const result = await user.save();
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

const createUser = async (req, res, next) => {
    let hashOut = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashOut;

    console.log("Request Body::",req.body)
    try {
        const user = await db.User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            roles: req.body.roles,
            restaurantId: req.body.restaurantId,
            branchId: req.body.branchId,
            status: req.body.status
        });
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    getRestaurantUsers,
    getBranchUsers,
    updateUser,
    createUser
}