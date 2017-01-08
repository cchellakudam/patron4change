import express from 'express';

export default (changemakerService) => {

	const router = express.Router();

	router.get('/', (req,res) => {
		changemakerService.getAllChangemakers().then(users => {
			res.send(users);
		});
	});

	router.post('/', (req, res) => {
		changemakerService.createChangemaker(req.body).then( id => {
			res.location(`${req.baseUrl}/${id}`);
			res.status(201).end();
		});
	});

	router.get('/featured', (req,res) => {
		changemakerService.getFeaturedChangemakers().then(changemakers => {
			res.send(changemakers);
		});
	});

	router.get('/:id', (req,res) => {
		changemakerService.getChangemakerById(req.params.id).then(changemaker => {
			res.send(changemaker);
		});
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
