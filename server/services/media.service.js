import { Client } from 'minio';
import uuid from 'uuid';

export default class {

  _processVideo(objectName) {
    // TODO process
    return Promise.resolve(objectName);
  }

  postProcessors = {
    video: this._processVideo
  };

  constructor(storageConfig) {
    this.minioClient = new Client({
      endPoint: storageConfig.host,
      // port: storageConfig.port,
      secure: true,
      accessKey: storageConfig.accessKey,
      secretKey: storageConfig.secretKey
    });
    this.bucketName = storageConfig.bucketName;
  }

	upload(data, type) {
    return new Promise((resolve, reject) => {
      const objectName = uuid();
      this.minioClient.putObject(this.bucketName, objectName, data, (err, etag) => {
        if (err) {
          return reject(err);
        }
        const postProcessor = this.postProcessors[type] || Promise.resolve;
        return postProcessor(objectName).then(() => {
          return resolve(objectName, etag);
        });
      });
    });
  }
}
