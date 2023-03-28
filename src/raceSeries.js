/**
 * Set Race series information
 *
 **/

class RaceSeries {
  constructor() {
    "use strict";

    var self = this;
    var seriesList_ = [];

    //var shRaces = new SheetOb().open( '1rdT0BPSFK2IxVltbQOfZfCDt5C834YxpmKHLZH4-Ms8', null); //races2016 spreadsheet
    var shRaces = new SheetOb().open(RACE_SERIES.races, null); // /My Drive/racing@BHYC/controlFiles/races

    /**
     * Set up series information based on sheet info
     * @return {series[][]} an array describing series
     */
    self.setSeries_ = function (name) {
      var headOb = shRaces.getHeaderOb();
      var col = headOb[name.toLowerCase()];
      var values = shRaces.getValues();
      var series = values.map(function (row, idx) {
        var aa = [];
        aa[0] = name.toUpperCase() + " R" + Number(idx + 1);
        aa[1] = row[col];
        aa[2] = row[col + 1];
        return aa;
      });

      series.unshift(["Event Id", "Event Date", "Formated Date"]);
      return series;
    };

    self.getList = function () {
      return seriesList_;
    };

    self.getSerie = function (name) {
      var series = seriesList_.filter(function (row) {
        Logger.log(row);
        return row[0] == name.toLowerCase();
      });
      if (series.length == 0) {
        var series = [];
        series[0] = name.toLowerCase();
        series[1] = self.setSeries_(series[0]);
        seriesList_.push(series);
      }
      return series;
    };

    return self;
  }
}
