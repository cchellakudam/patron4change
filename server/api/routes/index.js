import express from 'express';

import changemakerRoutes from'./changemaker.routes';
import adminRoutes from'./admin.routes';
import patronRoutes from'./patron.routes';
import userRoutes from'./user.routes';
import searchRoutes from'./search.routes';
import paymentRoutes from './payment.routes'

import changemakerDao from '../../data/changemakerDAO';
import userDAO from '../../data/userDAO';

import ChangemakerService from '../../services/changemaker.service.js';
import PatronService from '../../services/patron.service.js';
import UsersService from '../../services/users.service.js';
import SearchService from '../../services/search.service.js';
import mangoService from '../../services/payments/mango';

import config from 'config';
const searchConfig = config.get('search');

const router = express.Router();

router.get('/', (req, res) => {
	res.sendStatus(204);
});


const paymentsvcs = {mango: new mangoService()};

router.use('/changemaker', changemakerRoutes(new ChangemakerService(changemakerDao)));
router.use('/user', userRoutes(new UsersService(userDAO)));
router.use('/patron', patronRoutes(new PatronService(userDAO)));
router.use('/admin', adminRoutes(new UsersService(userDAO)));
router.use('/search', searchRoutes(new SearchService(searchConfig)));
router.use('/payment', paymentRoutes(paymentsvcs));

export default router;
