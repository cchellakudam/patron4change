import express from 'express';
const router = express.Router();

// routers for every user, doesnt matter if admin, patron, changemaker

router.get('/', (req,res) => {
	res.send(JSON.stringify([]));
});

router.get('/:username', (req,res) => {
	res.send(JSON.stringify({}));
});

router.post('/:username/resetpassword', (req, res) => {
	res.sendStatus(500)
});

module.exports = router;
