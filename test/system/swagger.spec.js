/* eslint no-sync: 0 */
import chai from 'chai';
import swaggerTest from 'swagger-test';
import yaml from 'yamljs';
import path from 'path';
import axios from 'axios';
import fs from 'fs';
const { expect, assert } = chai;

describe('api swagger', () => {

	function isNonParameterizedGet(xample) {
		return 'get' === xample.request.method.toLowerCase() && -1 === xample.request.uri.indexOf('{');
	}

	function isPositiveSample(xample) {
		return 200 === xample.response.status;
	}

  const yamlSpec = fs.readFileSync(path.join(__dirname, '../../public/definitions/swagger.yaml'), 'utf-8');
  const swaggerSpec = yaml.parse(yamlSpec);
  const xamples = swaggerTest.parse(swaggerSpec, { inferXamples: true });

  xamples.filter(isNonParameterizedGet).filter(isPositiveSample).forEach((xample) => {
    it(xample.description, () => {
      return axios[xample.request.method](xample.request.uri)
        .then((res) => {
          expect(res.status).to.equal(xample.response.status);
        })
        .catch((err) => {
          assert.fail(err);
        });
    });
  });
});
