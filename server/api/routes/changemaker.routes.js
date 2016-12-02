import express from 'express';
import dataAccessLayer from '../../data';
import changemakerService from '../../services/changemaker.service.js'
const router = express.Router();

// changemaker specific stuff

router.get('/featured', (req,res) => {
	changemakerService.getFeaturedChangemakers().then(changemakers => {
		res.send(changemakers)
	});	
}),

router.get('/', (req,res) => {
	dataAccessLayer.getAllChangemakers().then(users => {
		res.send(users);
	});
});

router.get('/:username', (req,res) => {
	res.send(JSON.stringify({}));
});

module.exports = router;
