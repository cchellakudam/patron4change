import express from 'express';

export default (paymentSvcs) => {

  const router = express.Router();

  router.post('/mango/register', (req, res) => {
		paymentSvcs.mango.registerUser(req.body).then((accountId) => {
			res.send(accountId)
		}).catch(() => {
			res.status(400).send('general operation error');
		})
	});

  router.post('/mango/pay', (req, res) => {
    const { patronId, amount, comment, changemakerId, accountId } = res.body;
  	paymentSvcs.mango.payUserWithCard(patronId, amount, comment, changemakerId, accountId).then((url) => {
  		res.send(url)
		}).catch(() => {
  		res.status(400).send('general operation error');
		})
	});

	router.post('/mango/preregisterCard', (req, res) => {
		paymentSvcs.mango.prepareToReadCardDetails(req.body).then((preRegistrationData) => {
			res.send(preRegistrationData)
		}).catch(() => {
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
