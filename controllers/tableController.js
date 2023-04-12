var db = require('../models/db');

const addTable = async (req, res, next) => {
  try {
    const { branchId, number, staus } = req.body;
    const table = await db.Table.create({
        branchId,
        number,
        staus
    });
    res.status(201).json(table);
  } catch (err) {
    next(err);
  }
}

const getAllBranchTables = async (req, res, next) => {
    console.log("Request Body: ", req.body)
  try {
    const tables = await db.Table.findAll({ where: { branchId: req.body.branchId } });
    res.status(200).json(tables);
  } catch (err) {
    next(err);
  }
}

const getTable = async (req, res, next) => {
  try {
    const table = await db.Table.findOne({ where: { tableId: req.body.tableId } });
    res.status(200).json(table);
  } catch (err) {
    next(err);
  }
}

const updateTable = async (req, res, next) => {
    try {
        const table = await db.Table.findOne({ where: { tableId: req.body.tableId } });
        if (req.body?.branchId) table.branchId = req.body.branchId;
        if (req.body?.number) table.number = req.body.number;
        if (req.body?.staus) table.staus = req.body.staus;
        
        const result = await table.save();
        res.json(result);
    } catch (err) {
        next(err);
    }
    }

const deleteTable = async (req, res, next) => {
    try {
        const table = await db.Table.findOne({ where: { tableId: req.body.tableId } });
        const result = await table.destroy();
        res.json(result);
    } catch (err) {
        next(err);
    }
    }

module.exports = {
    addTable,
    getAllBranchTables,
    getTable,
    updateTable,
    deleteTable
}