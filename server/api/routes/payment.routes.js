import express from 'express';

export default (paymentSvcs) => {

  const router = express.Router();

  router.post('/mango/register', (req, res) => {
		paymentSvcs.mango.registerUser(req.body).then((accountId) => {
			res.send(accountId)
		}).catch((err) => {
			res.status(400).send('a parameter error has occured');
		})
	});

  router.post('/mango/pay', (req, res) => {
  	paymentSvcs.mango.payUserWithCard(req.body.patronId, req.body.amount,
				req.body.changemakerId, req.body.accountId).then((url) => {
  		res.send(url)
		}).catch(() => {
  		res.status(400).send('a parameter error has occured');
		})
	})

  return router;
}
