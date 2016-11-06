/**
 * Error responses
 */

'use strict';

module.exports[404] = function pageNotFound(req, res) {
  var viewFilePath = '404';
  var statusCode = 404;
  var result = {
    status: statusCode
  };

  res.status(result.status);
  return res.render(viewFilePath, {}, function(err, html) {
    if (err) {
      return res.json(result, result.status);
    }

    return res.send(html);
  });
};
