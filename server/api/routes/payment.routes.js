import express from 'express';

const maxQueryLen = 256;

export default (paymentSvcs) => {

  const router = express.Router();

  router.post('/mango/register', (req, res) => {
		paymentSvcs.mango.registerUser(req.body).then((res) => {
			console.log(res);
		})
	});

  return router;
}
