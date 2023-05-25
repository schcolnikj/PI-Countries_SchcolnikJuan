const { Activity, Country } = require('../db')
const { getAllCountries } = require('./countryControllers')

const mapeo = async (arr) => {
    return await arr.map((ele) => {
        return{
            name: ele.name,
            difficulty: ele.difficulty,
            duration: ele.duration, 
            season: ele.season,
            countries: ele.countries
        }
    })
}

const createActivity = async (name, difficulty, duration, season, countries) => {
    await getAllCountries();
    
    // if(idPais.length !== 3) throw Error('El id debe tener 3 letras!')

    if(difficulty > 5 || difficulty < 1) throw Error('Difficulty must be set between 1 and 5!')

    // if(duration > 24 || duration < 1) throw Error("Duration can't be over 24")

    if(season !== "Summer" && season !== "Winter" && season !== "Autum" && season !== "Spring") throw Error('You must choose one of the seasons!')

    

    const newActivity = await Activity.create(
        {
            name, 
            difficulty, 
            duration, 
            season
        })
    
    countries.forEach(async (c) => {
        const country = await Country.findOne({
            where: {
                id: c,
            }
        })
        await newActivity.addCountry(country)
    })

    
    console.log("Activity: "+ name +" has been added to "+ countries);
    return newActivity;
}

const getActivities = async () => {
    const allActivities = await Activity.findAll()
    if(await allActivities.length < 1) console.log('No hay actividades para mostrar! Pruebe creando una.');

    // Hacemos un map para ocultar el map cuando se haga una petición tipo GET.
    // En caso de no ser necesario, simplemente retornamos allActivities.
    const activitiesSinId = await mapeo(allActivities)
    return activitiesSinId
}

module.exports ={
    createActivity,
    getActivities
}