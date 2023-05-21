const { Router } = require('express');
const { postActivitiesHandler, getActivitiesHandler } = require('../handlers/activityHandlers');
const activitiesRouter = Router();

activitiesRouter.post('/', postActivitiesHandler);

activitiesRouter.get('/', getActivitiesHandler);

module.exports = activitiesRouter;