const Place = require('../models/place');
const mongoose = require('mongoose');

exports.places_add_place = (req, res, next) => {
    const place = new Place({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        type: req.body.type,
        address: req.body.address,
        coordinates: req.body.coordinates,
        description: req.body.description,
        visitors: req.body.visitors,
    });
    place.save()
        .then(result => {
            res.status(201).json({
                message: 'Created place successfully',
                createdPlace: {
                    name: result.name,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/places/' + result._id
                    }
                }
            })
        })
        .catch(err => {
            console.log(err);
        })
};

exports.places_get_all = (req, res, next) => {
    Place.find()
    .select('name _id ') //userImage')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            places: docs.map(doc => {
                return {
                    name: doc.name,
                    _id: doc._id,
                    placeImage: doc.placeImage,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/places/' + doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.places_get_place =  (req, res, next) => {
    const id = req.params.placeId;
    Place.findById(id)
    .select('name type _id address coordinates visitors description')
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({
                place: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/places/'
                }
            });
        } else {
            res.status(404).json({message: 'No valid entry found '});
        }
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({error: err});
    });
};

exports.places_patch_place =  (req, res, next) => {
    const id = req.params.placeId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    };
    Place.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Place updated',
            request: {
                 type: 'GET',
                 url: 'http://localhost:3000/places/' + id
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.places_delete_place =  (req, res, next) => {
    const id = req.params.placeId;
    Place.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Place deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/places/',
                body: { first_name: 'String'}
            }
        })
    })
    .catch(err => {
        res.status(400).json({
            error: err
        });
    });
};

exports.places_delete_all =  (req, res, next) => {
    Place.deleteMany()
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'All places deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/places/',
                body: { name: 'String'}
            }
        })
    })
    .catch(err => {
        res.status(400).json({
            error: err
        });
    });
};