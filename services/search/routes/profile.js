import express from 'express';
import elastic from '../elastic';

const router = express.Router();
export default router;

const index = 'profile';

router.put('/:type/:id', (req, res) => {
  elastic.index({
    index: index,
    type: req.params.type,
    id: req.params.id,
    body: req.body
  })
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

router.delete('/:type/:id', (req, res) => {
  elastic.delete({
    index: index,
    type: req.params.type,
    id: req.params.id
  })
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});
