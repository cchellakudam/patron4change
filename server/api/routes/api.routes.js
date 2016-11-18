import express from 'express';
var router = express.Router();
var changemakerRoutes = require('./changemaker.routes');

router.get('/', (req, res) => {
	res.sendStatus(204);
});

router.use('/changemaker', changemakerRoutes);

module.exports = router;
