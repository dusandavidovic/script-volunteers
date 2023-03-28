/**
 * SheetOb Object
 *  spreadsheet management
 **/
var SheetOb = function () {
  "use strict";

  var ss_,
    name_,
    sheet_,
    values_,
    heads_,
    dataOb_,
    headerOb_,
    self = this;

  /**
   * open a sheet
   * @param {string} id the book id
   * @param {string} sheetName the sheet name
   * @return {Sheet} the sheet
   */
  self.open = function (id, sheetName) {
    ss_ = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
    sheet_ = sheetName ? ss_.getSheetByName(sheetName) : ss_.getActiveSheet();
    name_ = ss_.getName();
    return self;
  };

  /**
   * get the spreadsheet object
   * @param {Spreadsheet}
   */
  self.getSpreadsheet = function () {
    return ss_;
  };
  /**
   * get the sheet object
   * @param {Sheet} the sheet
   */
  self.getSheet = function () {
    return sheet_;
  };

  /**
   * refresh the data and turn it into a json object
   * @return {object} a JSON object representing the sheet data
   */
  self.refresh = function () {
    values_ = sheet_.getDataRange().getValues();
    heads_ = values_.shift();
    headerOb_ = Util.makeHeaderOb(heads_);
    dataOb_ = Util.makeDataOb(headerOb_, values_);
    return self;
  };

  /**
   * get the header ob
   * @return {object} the headerOb
   */
  self.getHeaderOb = function () {
    if (!headerOb_) self.refresh();
    return headerOb_;
  };
  /**
   * get the header values as array
   * @return {object[]} data values
   */
  self.getHeader = function () {
    if (!values_) self.refresh();
    return heads_;
  };

  /**
   * lookup row by value
   * @return {object} the headerOb
   */
  self.findRowByValue = function (hdrField, lookupValue) {
    if (!values_) self.refresh();
    var result = false;
    return values_.filter(function (d) {
      if (result) {
        //after hit, no more comparison!!!, returns only one
        return false;
      } else {
        result = d[headerOb_[hdrField]] == lookupValue;
        return result;
      }
    });
  };
  /**
   * get the data object , provoke a refresh if its not already done
   * @return {object} a JSON object represetnting the sheet data
   */
  self.getData = function () {
    if (!dataOb_) self.refresh();
    return dataOb_;
  };

  /**
   * get the data values as array
   * @return {object[][]} data values
   */
  self.getValues = function () {
    if (!values_) self.refresh();
    return values_;
  };

  /**
   * write a new data object, where the headers match
   * @param {object} data
   * @return {SheetOb} self
   */
  self.dump = function (data) {
    // map the new values
    var values = data.map(function (d) {
      return Object.keys(headerOb_).reduce(function (p, c) {
        p[headerOb_[c]] = d[c];
        return p;
      }, new Array(Object.keys(headerOb_).length));
    });

    // clear the data from the sheet if necessary
    var dr = sheet_.getDataRange();
    if (dr.getNumRows() > values.length + 1) {
      sheet_
        .getRange(values.length + 1, 1, dr.getNumRows() - values.length - 1, dr.getNumColumns())
        .clearContents();
    }

    // write out the new values
    if (values.length) {
      sheet_.getRange(2, 1, values.length, Object.keys(headerOb_).length).setValues(values);
    }

    // refresh this object
    self.refresh();

    return self;
  };

  return self;
};
