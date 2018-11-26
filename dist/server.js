"use strict";

var _express = _interopRequireDefault(require("express"));

var _apicache = _interopRequireDefault(require("apicache"));

var _app = _interopRequireDefault(require("./app"));

var _leanengine = _interopRequireDefault(require("leanengine"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const app = (0, _express.default)();
app.use(_apicache.default.middleware('720 minutes'));
app.get('/',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    const method = req.query.method;
    const vendor = req.query.vendor;
    const params = JSON.parse(req.query.params || '[]');

    if (!method) {
      res.status(400).send({
        error: '参数错误'
      });
      return;
    }

    let data;

    if (vendor) {
      data = yield _app.default[vendor][method](...params);
    } else {
      data = yield _app.default[method](...params);
    }

    res.send(data);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

if (process.env.LEAN) {
  _leanengine.default.init({
    appId: process.env.LEANCLOUD_APP_ID,
    appKey: process.env.LEANCLOUD_APP_KEY,
    masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
  });

  app.use(_leanengine.default.express());
}

app.listen(process.env.PORT || 3000);