import express from 'express';
const router = express.Router();
const changemakerRoutes = require('./changemaker.routes');

router.get('/', (req, res) => {
	res.sendStatus(204);
});

router.use('/changemaker', changemakerRoutes);

module.exports = router;
