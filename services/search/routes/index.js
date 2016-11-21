import express from 'express';
import profile from './profile';
import search from './search';

const router = express.Router();
export default router;

router.use('/profile', profile);
router.use('/search', search);

router.get('/', (req, res) => {
  res.sendStatus(204);
});
