import express from 'express';
import dataAccessLayer from '../../data';
const router = express.Router();

// changemaker specific stuff

router.get('/', (req,res) => {
	dataAccessLayer.getAllChangemakers().then(users => {
		res.send(users);
	});
});

router.get('/:username', (req,res) => {
	res.send(JSON.stringify({}));
});

module.exports = router;
