// External Dependancies
const boom = require('boom');
const fastify = require('fastify');
const logger = require('../helpers/logger');


// Get Data Models
const Car = require('../models/Car');
const utils = require('../helpers/utils');

// Get all cars
exports.getCars = async (req, reply) => {
  try {
    const cars = await Car.find()
    return cars
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single car by ID
exports.getSingleCar = async (req, reply) => {
  try {
    const id = req.params.id
    const car = await Car.findById(id)
    return car
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new car
exports.addCar = async (req) => {
  try {
    const carData = req.body;
    carData.tags = utils.transformArryToString(',', carData.tags); // tested already

    const car = new Car(carData);
    const addedCar = await car.save();
    logger.info({
      operation: "addNewCar",
      message: `added new car addedCar.title`,
    })
    return addedCar;
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing car
exports.updateCar = async (req) => {
  try {
    const id = req.params.id
    const car = req.body

    car.tags = utils.transformArryToString(',', car.tags); // tested already

    const { ...updateData } = car
    const update = await Car.findByIdAndUpdate(id, updateData, { new: true });
    logger.info({
      operation: "updateNewCar",
      message: `updated new car: ${id}`,
    });
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a car
exports.deleteCar = async (req, reply) => {
  try {
    const id = req.params.id
    const car = await Car.findByIdAndRemove(id)
    return car
  } catch (err) {
    throw boom.boomify(err)
  }
}