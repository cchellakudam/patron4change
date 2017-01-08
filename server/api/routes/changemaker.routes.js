import express from 'express';
import controller from './controller';

// changemaker specific stuff

export default (changemakerService) => {

	const router = express.Router();

	router.get('/', (req,res) => {
		changemakerService.getAllChangemakers().then(users => {
			res.send(users);
		});
	});

	router.get('/featured', controller(() => {
		return changemakerService.getFeaturedChangemakers();
	}));

	router.get('/:id', (req, res) => {
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
