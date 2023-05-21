const { Router } = require('express');
const { getAllCountriesHandler, getCountryByIdHandler} = require('../handlers/countryHandlers');
const countriesRouter = Router();


countriesRouter.get('/', getAllCountriesHandler);

countriesRouter.get('/:id', getCountryByIdHandler)



module.exports = countriesRouter;