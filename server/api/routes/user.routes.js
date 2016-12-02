import express from 'express';
import dataAccessLayer from '../../data';
const router = express.Router();

// routers for every user, doesnt matter if admin, patron, changemaker

router.get('/', (req,res) => {
	res.send(JSON.stringify([]));
});

router.get('/:id', (req,res) => {
	dataAccessLayer.getUserForId(req.params.id).then(user => {
		res.send(JSON.stringify(user));
	});
});

router.post('/:id/resetpassword', (req, res) => {
	res.sendStatus(500)
});

export default router;
