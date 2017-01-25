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

	router.put('/update/:id', (req,res) => {
		userSvc.updateUser(req.body.userInformation).then((user) => {
			res.send(user);
		}).catch(()=>{
			res.status(400).send('parameter error, please check your parameters');
		})
	})


	return router;
}
