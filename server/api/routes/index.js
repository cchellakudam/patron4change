import express from 'express';
const router = express.Router();
import changemakerRoutes from'./changemaker.routes';
import adminRoutes from'./admin.routes';
import patronRoutes from'./patron.routes';
import userRoutes from'./user.routes';
import searchRoutes from'./search.routes';

router.get('/', (req, res) => {
	res.sendStatus(204);
});

router.use('/changemaker', changemakerRoutes);
router.use('/user', userRoutes);
router.use('/patron', patronRoutes);
router.use('/admin', adminRoutes);
router.use('/search', searchRoutes);

module.exports = router;
