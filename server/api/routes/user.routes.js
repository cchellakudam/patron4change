import express from 'express';

// routers for every user, doesnt matter if admin, patron, changemaker

export default (userSvc) => {

	const router = express.Router();

	router.get('/:id', (req,res) => {
		userSvc.getUserForId(req.params.id).then(user => {
			res.send(user);
		});
	});

	router.post('/login', (req,res) => {
		userSvc.loginUser(req.body.email).then((user) => {
			res.send(user)
		})
	})

	router.put('/update', (req, res) => {
		userSvc.updateUser(req.body).then((user) => {
			res.send(user)
		})
	})

	return router;
}
