import express from 'express';

// changemaker specific stuff

export default (changemakerService) => {

	const router = express.Router();

	router.get('/', (req,res) => {
		changemakerService.getAllChangemakers().then(users => {
			res.send(users);
		});
	});

	router.get('/featured', (req,res) => {
		changemakerService.getFeaturedChangemakers().then(changemakers => {
			res.send(changemakers);
		});
	});

	router.get('/:id', (req,res) => {
		res.send({});
	});

	router.get('/:id/updates', (req, res) => {
		changemakerService.getUpdatesByUserId(req.params.id).then(updates => {
			res.send(updates);
		});
	})

	router.get('/:username', (req,res) => {
		res.send({});
	});

	return router;
}
