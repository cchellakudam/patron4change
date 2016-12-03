import config from 'config';
export default require('./' + config.get('dataLayer')).default;
