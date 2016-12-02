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

router.get('/:id', (req,res) => {
	res.send(JSON.stringify({}));
});

router.get('/:id/updates', (req, res) => {
	dataAccessLayer.getUpdatesByUserId(req.params.id).then(updates => {
		res.send(updates);
	});
})

module.exports = router;
