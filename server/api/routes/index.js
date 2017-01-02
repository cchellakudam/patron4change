import express from 'express';

import changemakerRoutes from'./changemaker.routes';
import adminRoutes from'./admin.routes';
import patronRoutes from'./patron.routes';
import userRoutes from'./user.routes';
import searchRoutes from'./search.routes';

import changemakerDao from '../../data/changemakerDAO';
import userDAO from '../../data/userDAO';

import ChangemakerService from '../../services/changemaker.service.js';
import PatronService from '../../services/patron.service.js';
import UsersService from '../../services/users.service.js';
import SearchService from '../../services/search.service.js';

import config from 'config';
const searchConfig = config.get('search');

const router = express.Router();

router.get('/', (req, res) => {
	res.sendStatus(204);
});

router.use('/changemakers', changemakerRoutes(new ChangemakerService(changemakerDao)));
router.use('/users', userRoutes(new UsersService(userDAO)));
router.use('/patrons', patronRoutes(new PatronService(userDAO)));
router.use('/admins', adminRoutes(new UsersService(userDAO)));
router.use('/searchs', searchRoutes(new SearchService(searchConfig, userDAO)));

export default router;
