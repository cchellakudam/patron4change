import express from 'express';

export default (paymentSvcs) => {

  const router = express.Router();

  router.post('/mango/register', (req, res) => {
		paymentSvcs.mango.registerUser(req.body).then((accountId) => {
			res.send(accountId)
		}).catch((err) => {
			res.status(400).send('general operation error');
		})
	});

  router.post('/mango/pay', (req, res) => {
  	paymentSvcs.mango.payUserWithCard(req.body.patronId, req.body.amount,
				req.body.changemakerId, req.body.accountId).then((url) => {
  		res.send(url)
		}).catch(() => {
  		res.status(400).send('general operation error');
		})
	});

	router.post('/mango/preregisterCard', (req, res) => {
		paymentSvcs.mango.prepareToReadCardDetails(req.body).then((preRegistrationData) => {
			res.send(preRegistrationData)
		}).catch((err) => {
			res.status(400).send('general operation error')
		})
	});

	router.post('/mango/registerCard', (req, res) => {
		paymentSvcs.mango.registerCreditCardForRecurringPayment(req.body)
			.then((cardRegistrationId) => {
				res.send(cardRegistrationId);
			}).catch(() => {
				res.status(400).send('general operation error')
			})
	});

	router.post('/mango/recurring', (req, res) => {
		paymentSvcs.mango.createRecurringPayment(req.body)
			.then((periodicBacking) => {
				res.send(periodicBacking);
			}).catch(() => {
			res.status(400).send('general operation error')
		})
	});

  return router;
}
