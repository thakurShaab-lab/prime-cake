const { body, param } = require('express-validator')
const countryModel = require('../../model/country/country')

const countryValidation = [

    body('country_name')
        .trim()
        .notEmpty().withMessage('Country name is required')
        .isLength({ min: 2, max: 64 }).withMessage('Country name must be 2–64 characters'),

    body('country_temp_name')
        .trim()
        .notEmpty().withMessage('Temp name is required'),

    body('TimeZone')
        .trim()
        .notEmpty().withMessage('Timezone is required'),

    body('UTC_offset')
        .trim()
        .notEmpty().withMessage('UTC offset is required')
]

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

    getById: async (req, res) => {
        try {
            const { id } = req.params

            const country = await countryModel.getById(Number(id))

            if (!country) {
                return res.status(404).json({
                    success: false,
                    message: 'Country not found'
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

    create: async (req, res) => {
        try {
            const data = {
                country_name: req.body.country_name,
                country_temp_name: req.body.country_temp_name,
                country_iso_code_2: req.body.country_iso_code_2 || null,
                country_iso_code_3: req.body.country_iso_code_3 || null,
                country_flag: req.body.country_flag || null,
                address_format_id: req.body.address_format_id || 0,
                is_feature: req.body.is_feature || '0',
                premimum_ads_avl: req.body.premimum_ads_avl || '1',
                status: '1',
                cont_currency: req.body.cont_currency || null,
                TimeZone: req.body.TimeZone,
                UTC_offset: req.body.UTC_offset,
                created_by: req.body.created_by || 1
            }

            await countryModel.create(data)

            return res.status(201).json({
                success: true,
                message: 'Country created successfully'
            })

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message || 'Failed to create country'
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

    update: async (req, res) => {
        try {
            const { id } = req.params

            const existing = await countryModel.getById(Number(id))
            if (!existing) {
                return res.status(404).json({
                    success: false,
                    message: 'Country not found'
                })
            }

            await countryModel.update(Number(id), req.body)

            return res.status(200).json({
                success: true,
                message: 'Country updated successfully'
            })

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update country'
            })
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params

            const existing = await countryModel.getById(Number(id))
            if (!existing) {
                return res.status(404).json({
                    success: false,
                    message: 'Country not found'
                })
            }

            await countryModel.delete(Number(id))

            return res.status(200).json({
                success: true,
                message: 'Country deleted successfully'
            })

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Failed to delete country'
            })
        }
    }

}

module.exports = {
    locationController,
    countryValidation
}