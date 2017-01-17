import express from 'express';

export default (paymentSvcs) => {

  const router = express.Router();

  router.post('/mango/register', (req, res) => {
		paymentSvcs.mango.registerUser(req.body).then((accountId) => {
			res.send(accountId)
		}).catch(() => {
			res.status(400).send('a parameter error has occured');
		})
	});

  router.post('/mango/pay', (req, res) => {
    const { patronId, amount, comment, changemakerId, accountId } = res.body;
  	paymentSvcs.mango.payUserWithCard(patronId, amount, comment, changemakerId, accountId).then((url) => {
  		res.send(url)
		}).catch(() => {
  		res.status(400).send('a parameter error has occured');
		})
	})

  return router;
}
