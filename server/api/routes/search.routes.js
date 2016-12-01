import express from 'express';
import axios from 'axios';
import config from 'config';

const searchConfig = config.get('search');
const searchApiUrl = `http://${searchConfig.host}:${searchConfig.port}/`;
const router = express.Router();

function mapData(r) {
  let clone = Object.assign({}, r._source);
  // add random image
  clone.id = r._id;
  clone.isBackedByMe = false;
  return clone;
}

function getHighlightSection(hit) {
  let { highlight } = hit;
  if (!highlight) {
    return null;
  }
  if (highlight.mission && 0 < highlight.mission.length) {
    return {
      type: 'mission',
      value: highlight.mission[0]
    }
  }
  return null;
}

router.get('/', (req, res) => {
  axios(`${searchApiUrl}search/changemaker?q=${req.query.q}`).then(searchRes => {
    let result = searchRes.data.map(hit => {
      return {
        match: {
          relevance: hit._score,
          section: getHighlightSection(hit)
        },
        // TODO get changemaker data from db by id to ensure same model as other apis
        changemaker: mapData(hit)
      };
    });
    res.status(200).send(result);
  }, () => {
    res.sendStatus(500);
  });
});

router.get('/suggestions', (req, res) => {
	res.status(501).send('Not Implemented');
});

export default router;
