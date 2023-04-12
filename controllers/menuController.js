const db = require('../models/db');


const addMenu = async (req, res, next) => {
  const image =  req.file.filename;

  try {
    const { name, price, description, quantity, category, restaurantId, userId, branchId, view } = req.body;
    console.log("Price: ", price)
    const menu = await db.Menu.create({
        name,
        price,
        description,
        quantity,
        category,
        restaurantId,
        userId,
        branchId,
        view,
        image_url: image ? image : "default.jpg"
    });
    res.status(201).json(menu);
  } catch (err) {
    next(err);
  }
}

const getAllMenu = async (req, res, next) => {
  try {
    const menu = await db.Menu.findAll();
    res.status(200).json(menu);
  } catch (err) {
    next(err);
  }
}

const getMenu = async (req, res, next) => {
  try {
    const menu = await db.Menu.findOne({ where: { menuId: req.body.menuId } });
    res.status(200).json(menu);
  } catch (err) {
    next(err);
  }
}

const updateMenu = async (req, res, next) => {
  try {
    const menu = await db.Menu.findOne({ where: { menuId: req.body.menuId } });
    if (req.body?.name) menu.name = req.body.name;
    if (req.body?.price) menu.price = req.body.price;
    if (req.body?.description) menu.description = req.body.description;
    if (req.body?.quantity) menu.quantity = req.body.quantity;
    if (req.body?.category) menu.category = req.body.category;
    if (req.body?.restaurantId) menu.restaurantId = req.body.restaurantId;
    if (req.body?.userId) menu.userId = req.body.userId;
    if (req.body?.image) menu.image = req.body.image;
    if (req.body?.branchId) menu.branchId = req.body.branchId;
    if (req.body?.view) menu.view = req.body.view;
    
    const result = await menu.save();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

const deleteMenu = async (req, res, next) => {
  // console.log("req.body", req.body)
    try {
        const menu = await db.Menu.findOne({ where: { menuId: req.body.menuId } });
        const result = await menu.destroy();
        res.json(result);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addMenu,
    getAllMenu,
    getMenu,
    updateMenu,
    deleteMenu,
};