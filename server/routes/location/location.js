
const express = require('express')
const router = express.Router()
const {locationController} = require('../../controllers/location/location')

router.get('/countries', locationController.getAll)
router.get('/states/:country_id', locationController.getStateByCountryId)
router.get('/cities/:state_id', locationController.getCityByStateId)

module.exports = router