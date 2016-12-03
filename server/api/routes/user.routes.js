import express from 'express';
import dataAccessLayer from '../../data';

// routers for every user, doesnt matter if admin, patron, changemaker

export default (userSvc) => {

	const router = express.Router();

	router.get('/:id', (req,res) => {
		userSvc.getUserForId(req.params.id).then(user => {
			res.send(user);
		});
	});

	router.post('/:id/resetpassword', (req, res) => {
		res.sendStatus(500)
	});

	return router;
}
