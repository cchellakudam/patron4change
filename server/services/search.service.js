import axios from 'axios';
import { ValidationError } from './error';

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

export default class {

  constructor(config) {
    this.searchApiUrl = `http://${config.host}:${config.port}/`;
  }

  search(term) {

    if (!term) {
      throw new ValidationError('term required');
    }

    return axios(`${this.searchApiUrl}search/changemaker?q=${term}`).then(searchRes => {
      return searchRes.data.map(hit => ({
        match: {
          relevance: hit._score,
          section: getHighlightSection(hit)
        },
        // TODO get changemaker data from db by id to ensure same model as other apis
        changemaker: mapData(hit)
      }));
    });
  }
}
