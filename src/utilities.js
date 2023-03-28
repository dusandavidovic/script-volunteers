/**
 * utility namepace
 * @return {Utility object}
 */
var Util = (function (util) {
  "use strict";

  util.getHeaderObj = function (sheet) {
    const sheetHead = fs.getRange(1, 1, 1, fs.getLastColumn()).getValues()[0]; // header row values
    return util.makeHeaderOb(sheetHead);
  };

  util.makeHeaderOb = function (head) {
    var idx = 0;
    return head.reduce(function (p, c) {
      p[util.camelize(c)] = idx++;
      return p;
    }, {});
  };

  // make data object for ONE row only
  util.makeDataOb = function (headOb, data) {
    var values = [];
    values.push(data);
    return values.map(function (row) {
      return Object.keys(headOb).reduce(function (p, c) {
        p[c] = row[headOb[c]];
        return p;
      }, {});
    });
  };

  util.camelize = function (str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index == 0 ? match.toLowerCase() : match.toUpperCase();
    });
  };

  return util;
})(Util || {});
