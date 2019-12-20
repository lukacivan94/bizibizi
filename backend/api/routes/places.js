const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false)
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});

const Place = require('../models/place');

const PlacesController = require('../controllers/places');

router.post('/', PlacesController.places_add_place);
router.get('/', PlacesController.places_get_all);
router.get('/:placeId', PlacesController.places_get_place);
router.patch('/:placeId', PlacesController.places_patch_place);
router.delete('/:placeId', PlacesController.places_delete_place);
router.delete('/', PlacesController.places_delete_all);


module.exports = router;