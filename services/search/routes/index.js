import express from 'express';
import profile from './profile';

const router = express.Router();
export default router;

router.use('/profile', profile);

router.get('/', (req, res) => {
  res.sendStatus(204);
});
