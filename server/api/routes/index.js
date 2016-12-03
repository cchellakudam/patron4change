import express from 'express';

import changemakerRoutes from'./changemaker.routes';
import adminRoutes from'./admin.routes';
import patronRoutes from'./patron.routes';
import userRoutes from'./user.routes';
import searchRoutes from'./search.routes';

import dao from '../../data';

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

router.use('/changemaker', changemakerRoutes(new ChangemakerService(dao)));
router.use('/user', userRoutes(new UsersService(dao)));
router.use('/patron', patronRoutes(new PatronService(dao)));
router.use('/admin', adminRoutes(new UsersService(dao)));
router.use('/search', searchRoutes(new SearchService(searchConfig)));

export default router;
