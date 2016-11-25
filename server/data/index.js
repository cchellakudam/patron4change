
import mocklayer from './mockdatalayer';
import dataAccessLayer from './dataAccessLayer';

const env = process.env.NODE_ENV;

if('unit' === env){
	module.exports = mocklayer;
}else{
	module.exports = dataAccessLayer;
}
