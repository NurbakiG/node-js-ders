var express = require('express');
var router = express.Router();
const mongoose = require('mongoose'); 
const Categories = require('../db/models/Categories');
const Response = require("../lib/Response");
const CustomError = require('../lib/Error');
const Enum = require('../config/Enum');

router.get('/', async (req, res) => {
    try {
        let categories = await Categories.find({});
        res.json(Response.successResponse(categories));
    } catch(err){
        let errorResponse = Response.errorResponse(err); 
        res.status(errorResponse.code).json(errorResponse);
    }
});

router.post('/add', async (req, res) => {
    let body = req.body;    
    try {        
        if(!body.name) throw new CustomError(Enum.HTTPS_CODES.BAD_REQUEST, "Validation Error!","name değeri eksik");
        
        
        let category = new Categories({
            name: body.name,
            is_active: true,
            created_by: new mongoose.Types.ObjectId()  // Geçici ObjectId
        });
        
        await category.save();
        
        res.json(Response.successResponse({success: true}));

    } catch(err) {
        let errorResponse = Response.errorResponse(err);        
        res.status(errorResponse.code).json(errorResponse);
    }
});

router.post('/update', async (req, res) => {
    let body = req.body;    
    try {        
        
        if (!body._id) throw new CustomError(Enum.HTTPS_CODES.BAD_REQUEST, "Validation Error!","id eksik moruk");
        let update = {};

        if(body.name) update.name = body.name;
        if(typeof body.is_active === "boolean") update.is_active = body.is_active;

        await Categories.updateOne({_id: body._id}, update)
        
        res.json(Response.successResponse({success: true}));

    } catch(err) {
        let errorResponse = Response.errorResponse(err);        
        res.status(errorResponse.code).json(errorResponse);
    }
});

router.post('/delete', async (req, res) => {
    let body = req.body;    
    try {        
        
        if (!body._id) throw new CustomError(Enum.HTTPS_CODES.BAD_REQUEST, "Validation Error!","id eksik moruk");

        await Categories.findByIdAndDelete(body._id);
        
        res.json(Response.successResponse({success: true}));

    } catch(err) {
        let errorResponse = Response.errorResponse(err);        
        res.status(errorResponse.code).json(errorResponse);
    }
});

module.exports = router;