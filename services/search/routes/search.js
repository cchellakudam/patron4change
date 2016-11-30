import express from 'express';
import elastic from '../elastic';

const router = express.Router();
export default router;

router.get('/:type', (req, res) => {
  elastic.search({
    index: '_all',
    type: req.params.type,
    q: req.query.q
  })
  .then((result) => {
    res.status(200).send(result.hits.hits);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});
