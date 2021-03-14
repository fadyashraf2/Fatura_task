exports.pagination =  (limit, maxLimit) =>{
  var _limit = typeof limit === "number" ? parseInt(limit) : 25;
  var _maxLimit = (typeof maxLimit === 'number') ? parseInt(maxLimit) : 100;

  return function _middleware(req, res, next) {
    req.query.page =
      typeof req.query.page === "string"
        ? parseInt(req.query.page, ) || 1
        : 1;

    req.query.limit =
      typeof req.query.limit === "string"
        ? parseInt(req.query.limit, 10) || 0
        : _limit;

    if (req.query.limit > _maxLimit) req.query.limit = _maxLimit;

    if (req.query.page < 1) req.query.page = 1;

    if (req.query.limit < 0) req.query.limit = 0;

    req.skip = req.offset = req.query.page * req.query.limit - req.query.limit;

    res.locals.paginate = {};
    res.locals.paginate.page = req.query.page;
    res.locals.paginate.limit = req.query.limit;

    next();
  };
};
