import express from 'express';

export default (paymentSvcs) => {

  const router = express.Router();

  router.post('/mango/register', (req, res) => {
		paymentSvcs.mango.registerUser(req.body).then((user) => {
			res.send(user)
		})

	});

  return router;
}
