const { createActivity, getActivities } = require("../controllers/activityControllers");


const postActivitiesHandler = async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;
    try {
        await createActivity (name, difficulty, duration, season, countries);
        res.status(201).json('La actividad se creó exitosamente!')
    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}

const getActivitiesHandler = async (req, res) => {
    try {
        const allActivities = await getActivities();
        res.status(200).json(allActivities)
    } catch (error) {
        res.status(400).json({Error: error.message})
    }
}

module.exports = {
    postActivitiesHandler,
    getActivitiesHandler
}