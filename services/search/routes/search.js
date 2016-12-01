/* eslint camelcase: 0 */
// camelcase ignored for elastic queries

import express from 'express';
import elastic from '../elastic';

const router = express.Router();
export default router;

router.get('/:type', (req, res) => {
  elastic.search({
    index: '_all',
    type: req.params.type,
    body: {
      query: {
        bool: {
          should: [
            {
              match_phrase: {
                mission: req.query.q
              }
            },
            {
              multi_match: {
                type: 'most_fields',
                query: req.query.q,
                fields: [ 'lastName^2', 'firstName' ]
              }
            }
          ]
        }
      },
      highlight: {
        fields: {
          mission: {}
        }
      }
    }
  })
  .then((result) => {
    res.status(200).send(result.hits.hits);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});
