const db = require('../models/db');

const addBranch = async (req, res, next) => {

    console.log("Request Body: ", req.body)
    console.log("Request Files: ", req.files)
      // Get the names of the uploaded files
    const logo = req.files[0].originalname;
    const banner = req.files[1].originalname;
    console.log('Uploaded files:', logo, banner);
    try {
        const {restaurantId,userId,name,address,phone,email,description,status,openTime,openDays,logo,banner,logoBlurHash,bannerBlurHash} = req.body;
        const branch = await db.Branch.create({
            restaurantId,
            userId,
            name,
            address,
            phone,
            email,
            description,
            status,
            openTime,
            openDays,
            logo : logo ? logo : "default.jpg",
            logoBlurHash,
            banner : banner ? banner : "default.jpg",
            bannerBlurHash
        });
        console.log("Branch INFO: ", branch)
        res.status(201).json(branch);
    } catch (err) {
        console.log("Error: ", err)
        next(err);
    }
    }

const getAllBranch = async (req, res, next) => {
    try {
        const branch = await db.Branch.findAll();
        res.status(200).json(branch);
    } catch (err) {
        next(err);
    }
}

const getBranch = async (req, res, next) => {
    try {
        const branch = await db.Branch.findOne({ where: { branchId: req.body.branchId } });
        res.status(200).json(branch);
    } catch (err) {
        next(err);
    }
}

const updateBranch = async (req, res, next) => {
    try {
        const branch = await db.Branch.findOne({ where: { branchId: req.body.branchId } });
        if (req.body?.name) branch.name = req.body.name;
        if (req.body?.address) branch.address = req.body.address;
        if (req.body?.contact) branch.contact = req.body.contact;
        if (req.body?.restaurantId) branch.restaurantId = req.body.restaurantId;
        if (req.body?.userId) branch.userId = req.body.userId;
        if (req.body?.image) branch.image = req.body.image;
        const result = await branch.save();
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

const deleteBranch = async (req, res, next) => {
    try {
        const branch = await db.Branch.findOne({ where: { branchId: req.body.branchId } });
        const result = await branch.destroy();
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

const getBranchByRestaurantId = async (req, res, next) => {
    try {
        const branch = await db.Branch.findAll({ where: { restaurantId: req.body.restaurantId } });
        res.status(200).json(branch);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addBranch,
    getAllBranch,
    getBranch,
    updateBranch,
    deleteBranch,
    getBranchByRestaurantId
}