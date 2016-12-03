export default (controller, exceptionMapping) => {

  return (req, res, next) => {
    let params = {};
    if ('GET' !== req.method) {
      params.model = req.body;
    }
    Object.assign(params, req.query);

    function handleException(ex) {
      let err = ex;
      if ('object' !== typeof err) {
        return false
      }
      let { name } = err;
      if ('string' !== typeof name || !name) {
        return false;
      }
      name = name.replace(/error/i, '').toLowerCase();
      let statusCode = exceptionMapping[name];
      if (!statusCode) {
        return false;
      }
      res.status(statusCode).send(err.message);
      return true;
    }

    let p;
    try {
      p = controller(params);
    } catch (ex) {

      if (!handleException(ex)) {
        next(ex);
      }
      return;
    }

    if ('function' === typeof p.then) {

      p.then((result) => {
        res.status(200).send(result);
      }, (err) => {
        if (!handleException(err)) {
          next(err);
        }
        return;
      });

    } else {
      res.status(p.status).send(p.message);
    }
  }
};
