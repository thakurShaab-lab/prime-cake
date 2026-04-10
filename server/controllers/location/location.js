const { body, param } = require('express-validator')
const countryModel = require('../../model/country/country')
const stateModel = require('../../model/state/state')
const cityModel = require('../../model/city/city')

const locationController = {

    getAll: async (req, res) => {
        try {
            const countries = await countryModel.getAll()

            return res.status(200).json({
                success: true,
                data: countries
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch countries'
            })
        }
    },

    getByStateId: async (req, res) => {
        try {
            const { state_id } = req.params

            const country = await countryModel.getByStateId(Number(state_id))

            if (!country) {
                return res.status(404).json({
                    success: false,
                    message: 'Country not found for this state'
                })
            }

            return res.status(200).json({
                success: true,
                data: country
            })

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch country'
            })
        }
    },

    getStateByCountryId: async (req, res) => {
        try {
            const { country_id } = req.params

            const states = await stateModel.getByCountryId(Number(country_id))

            return res.status(200).json({
                success: true,
                data: states
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch states'
            })
        }
    },

    getCityByStateId: async (req, res) => {
        try {
            const { state_id } = req.params

            const cities = await cityModel.getByStateId(Number(state_id))

            return res.status(200).json({
                success: true,
                data: cities
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch cities'
            })
        }
    }
}

module.exports = {
    locationController,
}