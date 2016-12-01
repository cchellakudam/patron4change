import express from 'express';
const router = express.Router();
const changemakerRoutes = require('./changemaker.routes');
const adminRoutes = require('./admin.routes');
const patronRoutes = require('./patron.routes');
const userRoutes = require('./user.routes');

router.get('/', (req, res) => {
	res.sendStatus(204);
});

router.use('/changemaker', changemakerRoutes);
router.use('/user', userRoutes);
router.use('/patron', patronRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
