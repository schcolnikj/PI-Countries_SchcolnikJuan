const axios = require('axios')
const {Country, Activity} = require('../db')
const { Op } = require ('sequelize')

const mapeo = async (arr) => {
    return arr.map((ele) => {
        return{
            id: ele.cca3,
            name: ele.name['common'],
            flags: ele.flags[0],
            continents: ele.continents && Array.isArray(ele.continents) ? ele.continents.join(', ') : '', 
            capital: ele.capital && ele.capital.length > 0 ? ele.capital[0] : '',
            subregion: ele.subregion,
            area: ele.area,
            population: ele.population
        }
    })
}

const getAllCountries = async () => {
    try {     
        const apiData = (await axios(`https://restcountries.com/v3/all`)).data;
        
        const apiCountries = await mapeo(apiData);
        
        for (let apiCountry of apiCountries) {
            const [dbCountry, created] = await Country.findOrCreate({
                where: {
                    id: apiCountry.id
                },
                include: {
                    model: Activity
                },
                defaults: apiCountry,
                
            })

            if (!created) {
                await dbCountry.update(apiCountry)
            }
        }

        const dbCountries = await Country.findAll({include: {model: Activity}})

        return dbCountries;
    } catch (error) {
        throw Error(error)
    }
}

const getCountryById = async (id) => {
    // await getAllCountries(); 
    const iD = id.toUpperCase()
    const country = await Country.findByPk(iD, {include: {model: Activity}})
    return country
  };

const getCountryByName = async (name) => {
    try {
        await getAllCountries();
        const countries = await Country.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`
            }
          },
          include: {
            model: Activity
          }
        });
        return countries;
      } catch (error) {
        throw new Error(error.message);
      }
}

module.exports = {
    getAllCountries,
    getCountryById,
    getCountryByName
};