import elastic from '../elastic';

export default (params) => {
  return new Promise((resolve, reject) => {
    elastic.suggest({
      index: '',
      body: {
        [params.type]: {
          text: params.q,
          completion: {
            field: 'suggest'
          }
        }
      }
    })
    .then((result) => {
      resolve(result[params.type].reduce((results, result) => {
        return results.concat(result.options.map(option => {
          return option.text;
        }));
      }, []));
    })
    .catch(reject);
  });
};
