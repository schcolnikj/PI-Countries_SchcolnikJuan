const { getAllCountries, getCountryById, getCountryByName } = require('../controllers/countryControllers');

const getAllCountriesHandler = async (req, res) => {
    const { name } = req.query;
    try {
        if(name){
            const countries = await getCountryByName(name);
            if(countries.length === 0){
                res.status(400).json({error: 'No se encontro ningúna coincidencia'})
            }else{
            res.status(200).json(countries);
            }
        }else{
            const allCountries = await getAllCountries();
            res.status(200).json(allCountries)
        }

    } catch (error) {
        
    }
}

const getCountryByIdHandler = async (req, res) => {
    const  id  = req.params.id
    
    try {
        if(id.length < 3 || id.length > 3){res.status(400).json({Message: 'El id debe tener 3 letras!'})}
        else{
            const country = await getCountryById(id)
            if(!country){
                res.status(400).json({Message: 'No se encontraron coincidencias!'})
            }else{
            res.status(200).json(country)
            }
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    } 
}



module.exports = {
    getAllCountriesHandler,
    getCountryByIdHandler,
};